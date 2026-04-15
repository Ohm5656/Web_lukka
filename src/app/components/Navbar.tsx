import * as React from "react";
import { Link, useLocation } from "react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { mainNavLinks, storeName } from "../lib/site";
import techHavenLogo from "../../assets/techhaven-logo.png";
import { Button, cn } from "./ui/Button";
import { Badge } from "./ui/Badge";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navButtonClassName = (isActive: boolean) =>
    cn(
      "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
      isActive ? "bg-neutral-100 text-neutral-950" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/92 shadow-sm shadow-neutral-950/5 backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex min-h-16 items-center justify-between gap-4 py-2">
          <Link to="/" className="flex items-center">
            <img
              src={techHavenLogo}
              alt={`${storeName} logo`}
              className="h-auto w-[160px] object-contain sm:w-[190px] lg:w-[220px]"
            />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {mainNavLinks.map((link) => (
              <Link key={link.path} to={link.path} className={navButtonClassName(location.pathname === link.path)}>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full bg-neutral-100 text-neutral-900">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Badge className="absolute -right-1 -top-1 flex h-5 w-5 justify-center rounded-full bg-red-700 p-0 text-[10px] shadow-sm">2</Badge>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full bg-neutral-100 text-neutral-900">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Badge className="absolute -right-1 -top-1 flex h-5 w-5 justify-center rounded-full bg-red-700 p-0 text-[10px] shadow-sm">2</Badge>
            </Link>
            <Button variant="ghost" size="icon" className="rounded-full bg-neutral-100 text-neutral-900" onClick={() => setIsOpen((open) => !open)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-neutral-200 py-5 lg:hidden">
            <div className="space-y-2">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                    location.pathname === link.path ? "bg-neutral-100 text-neutral-950" : "text-neutral-700 hover:bg-neutral-50",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
