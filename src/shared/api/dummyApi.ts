import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://dummyjson.com";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

type LoginResponse = User & {
  token: string;
};

export const dummyApi = createApi({
  reducerPath: "dummyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { auth?: { token?: string } };
      const token = state.auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body
      })
    }),
    me: builder.query<User, void>({
      query: () => "/auth/me"
    }),
    products: builder.query<ProductsResponse, { limit: number; skip: number }>({
      query: ({ limit, skip }) => ({
        url: "/products",
        params: { limit, skip }
      })
    }),
    product: builder.query<Product, number>({
      query: (id) => `/products/${id}`
    }),
    searchProducts: builder.query<
      ProductsResponse,
      { q: string; limit: number; skip: number }
    >({
      query: ({ q, limit, skip }) => ({
        url: "/products/search",
        params: { q, limit, skip }
      })
    })
  })
});

export const {
  useLoginMutation,
  useMeQuery,
  useProductsQuery,
  useProductQuery,
  useSearchProductsQuery
} = dummyApi;

