type Endpoints = {
  SYS_API_ENDPOINT: string;
  SYS_API_AUTHENTICATION_ENDPOINT: { controller: string };
  SYS_API_SSE_ENDPOINT: { controller: string };
  ENTITY_ENDPOINT: {
    buy: { controller: string; domain: string };
    customer: { controller: string; domain: string };
    notification: { controller: string; domain: string; subdomain: string };
    organic: { controller: string; domain: string };
    packaging: { controller: string; domain: string };
    product: { controller: string; domain: string };
    production: { controller: string; domain: string };
    sale: { controller: string; domain: string };
    supplier: { controller: string; domain: string };
    user: { controller: string; domain: string };
  };
  CEP_API_ENDPOINT: string;
};

export const endpoints: Endpoints = {
  // System API endpoint URL.
  SYS_API_ENDPOINT: "https://localhost:4000",
  SYS_API_AUTHENTICATION_ENDPOINT: { controller: "authentication" },
  SYS_API_SSE_ENDPOINT: { controller: "events" },
  // Entities endpoints URL.
  ENTITY_ENDPOINT: {
    buy: { controller: "orders", domain: "buys", },
    customer: { controller: "companies", domain: "customers" },
    notification: { controller: "notifications", domain: "users", subdomain: "notifications"},
    organic: { controller: "stock", domain: "organics" },
    packaging: { controller: "stock", domain: "packagings" },
    product: { controller: "stock", domain: "products" },
    production: { controller: "orders", domain: "productions" },
    sale: { controller: "orders", domain: "sales" },
    supplier: { controller: "companies", domain: "suppliers" },
    user: { controller: "personnel", domain: "users" }
  },
  // Postal code API endpoint URL.
  CEP_API_ENDPOINT: "https://opencep.com/v1",
};
