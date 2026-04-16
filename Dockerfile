# 1) Build frontend
FROM node:20-alpine AS frontend
WORKDIR /src/client

COPY client/package*.json ./
RUN npm install

COPY client .
RUN npm run build

# 2) Build backend
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY server/server.csproj server/
RUN dotnet restore server/server.csproj

COPY server/ server/
RUN dotnet publish server/server.csproj -c Release -o /app/publish

# 3) Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .
COPY --from=frontend /src/client/dist ./client/dist

ENV ASPNETCORE_URLS=http://0.0.0.0:$PORT
EXPOSE 8080

ENTRYPOINT ["dotnet", "server.dll"]