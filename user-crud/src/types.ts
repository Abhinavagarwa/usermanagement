// src/types.ts
export interface Address {
    street: string;
    city: string;
  }
  
  export interface Company {
    name?: string | null;
  }
  
  export interface User {
    id?: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    address: Address;
    company: Company | null;
    website?: string | null;
  }
  