export interface User {
    name: string;
    surname: string;
    personalNumber: string;
    date: string;
    gender: string;
    city: string;
    address: string;
    id?: number;
    customFields?: { name: string; value: string }[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  