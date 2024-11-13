// src/index.ts

import { initializeApp } from 'firebase-admin/app';
import { onRequest } from 'firebase-functions/v2/https';
import { apiApp } from './api';
import { FirebaseSecrets } from './core/utils/firebase-secrets';
import { eventTriggers } from './event-triggers';
import { callableFunctions } from './app-functions';

export type UserRole = 'client' | 'admin';
export type MyClaims = 'authenticated' | UserRole;
export type SubscriptionType =
  | 'allstar'
  | 'nomad'
  | 'explorer'
  | 'weektripper'
  | 'daytripper'
  | 'socializer'
  | 'connector'
  | 'checkpoint';

initializeApp();

process.env.TZ = 'Europe/Amsterdam';

const savageApiKey = FirebaseSecrets.appApiKey;
const sendgridApiKey = FirebaseSecrets.sendgridApiKey;

exports.api = onRequest(
  { region: 'europe-west3', secrets: [savageApiKey, sendgridApiKey] },
  apiApp
);
Object.assign(exports, eventTriggers());
Object.assign(exports, callableFunctions());
