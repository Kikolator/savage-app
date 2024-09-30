// src/index.ts

import { initializeApp } from 'firebase-admin/app';
import { onRequest } from 'firebase-functions/v2/https';
import { apiApp } from './api';
import { defineSecret } from 'firebase-functions/params';

initializeApp();

export type UserRole = 'client' | 'admin';
export type MyClaims = 'authenticated' | UserRole;
export type SubscriptionType =
  | 'allstar'
  | 'nomad'
  | 'explorer'
  | 'weektripper'
  | 'daytripper'
  | 'socialiser'
  | 'connector'
  | 'checkpoint';

const savageApiKey = defineSecret('SAVAGE_API_KEY');

exports.api = onRequest(
  { region: 'europe-west3', secrets: [savageApiKey] },
  apiApp
);
