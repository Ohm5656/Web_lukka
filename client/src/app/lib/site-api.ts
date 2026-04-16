import { apiUrl } from "./api";

export type ContactInfo = {
  address: string;
  phone: string;
  email: string;
  hours: string;
  maps: string;
  line: string;
  facebook: string;
};

export type ContactFormPayload = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactFormResponse = {
  message: string;
  submissionId: string;
  submittedAt: string;
};

export type OrderItemPayload = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type OrderPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  province: string;
  postalCode: string;
  paymentMethod: string;
  items: OrderItemPayload[];
};

export type OrderResponse = {
  message: string;
  orderId: string;
  submittedAt: string;
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
  };
};

export async function fetchContactInfo() {
  const response = await fetch(apiUrl("/site/contact-info"));

  if (!response.ok) {
    throw new Error(`Request failed for /site/contact-info: ${response.status}`);
  }

  return response.json() as Promise<ContactInfo>;
}

export async function submitContactForm(payload: ContactFormPayload) {
  const response = await fetch(apiUrl("/contact"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const validationErrors = errorBody?.errors as Record<string, string[]> | undefined;
    const firstValidationMessage = validationErrors
      ? Object.values(validationErrors).flat()[0]
      : null;

    throw new Error(firstValidationMessage ?? `Request failed for /contact: ${response.status}`);
  }

  return response.json() as Promise<ContactFormResponse>;
}

export async function submitOrder(payload: OrderPayload) {
  const response = await fetch(apiUrl("/orders"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const validationErrors = errorBody?.errors as Record<string, string[]> | undefined;
    const firstValidationMessage = validationErrors ? Object.values(validationErrors).flat()[0] : null;

    throw new Error(firstValidationMessage ?? `Request failed for /orders: ${response.status}`);
  }

  return response.json() as Promise<OrderResponse>;
}
