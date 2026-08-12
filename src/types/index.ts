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
  displayName: string;
  email: string;
  _id: string;
  createdAt: number;
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
  userId: string;
  title: string;
  description: string;
  occurredAt: Date;
  createdAt: Date;
  lastModified: Date;
  readsAt: Date[];
  tags: Tag[];
  deleted?: boolean
};


export type ThoughtPayload = Omit<Thought, "tags"> & {
  tags: string[]
}


export type Tag = {
  _id: string,
  userId: string,
  name: string,
  createdAt: Date
  deleted?: boolean
}

export type ClientThought = Omit<Thought, "createdAt" | "lastModified">;
