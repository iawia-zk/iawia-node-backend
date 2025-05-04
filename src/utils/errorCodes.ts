export type BaseError = {
  code: string;
  message: string;
  statusCode: number;
};

export const VALIDATION_ERROR: BaseError = {
  code: 'VALIDATION_ERROR',
  message: 'Validation error',
  statusCode: 400,
};

export const GENERIC_ERROR: BaseError = {
  code: 'GENERIC_ERROR',
  message: 'Something went wrong',
  statusCode: 500,
};

export const NOT_FOUND_ERROR: BaseError = {
  code: 'NOT_FOUND_ERROR',
  message: 'Not found',
  statusCode: 404,
};

export const INTERNAL_SERVER_ERROR: BaseError = {
  code: 'INTERNAL_SERVER_ERROR',
  message: 'Internal server error',
  statusCode: 500,
};

export const UNAUTHORIZED_ERROR: BaseError = {
  code: 'UNAUTHORIZED_ERROR',
  message: 'Unauthorized',
  statusCode: 401,
};
