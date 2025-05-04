import { Request, Response } from 'express';

export type EmptyParams = {};
export type EmptyReqBody = {};
export type EmptyQuery = {};
export type EmptyResBody = {};

export type AuthenticatedRequest<
  Params = EmptyParams,
  RequestBody = EmptyReqBody,
  Query = EmptyQuery,
> = Request<Params, EmptyResBody, RequestBody, Query> & {
  user?: {
    uid: string;
    email?: string;
  };
};
export type CustomResponse<T> = Response<T | { error?: string }>;
