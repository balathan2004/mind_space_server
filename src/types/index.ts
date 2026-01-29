import { Request } from "express";
export interface ResponseConfig {
  message: string;
}

export interface JwtRequest extends Request {
  jwt?: User;
}

export interface VerifiedJwtRequest extends Request {
  jwt: User;
}

export interface QuoteResponseConfig {
  quote: string;
}

export interface User {
  display_name: string;
  email: string;
  uid: string;
  created_at: number;
}

export interface SecureUser extends User {
  accessToken: string;
  refreshToken: string;
}

export type DataResponseConfig<T> = {
  data: T;
  message: string;
};

export type DataListResponseConfig<T> = {
  data: T[];
  message: string;
};

export type encryptedDoc = {
  encrypted: boolean;
  data: string;
};

export interface QuoteResponseConfig {
  quote: string;
}

export interface EncryptedThought {
  encrypted: boolean;
  data: string;
}

export type Thought = {
  _id: string;
  uid: string;
  title: string;
  description: string;
  occurredAt: Date;
  createdAt: Date;
  lastModified: Date;
  readsAt: Date[];
  tags: string[];
};

export type ClientThought = Omit<Thought, "createdAt" | "lastModified">;
