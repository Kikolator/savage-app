// src/index.ts

import { initializeApp } from 'firebase-admin/app';
import { onRequest } from 'firebase-functions/v2/https';
import { apiApp } from './api';

initializeApp();

export type UserRole = 'storeOwner' | 'buyer' | 'admin';
export type MyClaims = 'authenticated' | UserRole;

exports.api = onRequest(apiApp);
