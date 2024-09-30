// src/api/middleware/verify-api-key.ts

import { Request, Response, NextFunction } from 'express';

const _apiKey = (req: Request) => {
  const apiHeaderValue: string | undefined =
    req.headers['x-api-key']?.toString();
  if (!apiHeaderValue?.length || apiHeaderValue.length < 36) {
    return null;
  } else {
    return apiHeaderValue;
  }
};

export const verifyApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = _apiKey(req);
  if (!apiKey?.length) {
    next();
    return;
  } else {
    req.apiKey = apiKey;
    next();
    return;
  }
};
