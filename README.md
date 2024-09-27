# The Savage Coworking App

### Tech Stack

1. Frontend:
   1. Flutter
   2. State Management: Provider
2. Backend:
   1. Language: Typescript
      1. In case of more data driven functionalities: python
   2. Database: PostgreSQL
3. Authentication:
   1. Firebase Authentication
4. Email & Messaging:
   1. Sendgrid
5. Real-time Communication:
   1. Firebase Firestore
6. Hosting and Deployment:
   1. Firebase Hosting
   2. Backend hosting: Google Cloud Platform
7. API Layer:
   1. REST
8. CI/CD:
   1. Github Actions
9. Analytics & Monitoring:
   1. Google Analytics (web) & Firebase analytics (App)
   2. Crashlytics (App)
10. Scalability ConsiderationsL:
    1. Microservice Arhcitecture
    2. Serverless Functions:
       1. Firebase Functions

### Functionnalities in progress:

My Savage Functionalities:

- Store contact data of contacts, leads, clients, etc.
- Purchase Coworking space credits.
- Authentication for coworking space users.
- Store/handle client credits.
- Book desk space, meeting room, parking,.. and show availability.
- Event calendar
- Browse/search community memebers.

QR Functionalities

- Generate and handle dynamic QR codes.

## Firebase Authentication

Providers to setup:

- [ ] Email and password
- [ ] Phone
- [ ] Google
- [ ] Apple
- [ ] Github

## Firebase Functions

### Webhooks

## Databases

Real-time connections like bookings with Firestore.  
Relational data like user data PostgreSQL.

## Firebase Storage

## Firebase Hosting

### Qr Codes

Domain: qr.savage-coworking.com

#TODO add hashing for security when transporting sensitive data.

Dynamic codes:

> **2kHLrT**
>
> location: Brochure English  
> Redirect: Website

> **4x7PQ2**
>
> location: Brochure Spanish  
> Redirect: Website Spanish

> **Z4R9TQ**
>
> location: Presentation Map  
> Redirect: Website

> **H4K5ZQ**
>
> location: Bunsiness cards Nic  
> Redirect: Instagram

> **W3P7XQ**
>
> location: Business cards Ines  
> Redirect: Instagram

> **a9B3Zd**
>
> location: Presentation Map Easter Egg  
> Redirect: Instagram

> **A7B2D9**
>
> location: Window Sticker  
> Redirect: Instagram

> **B7aD1c**
>
> location: Beermats  
> Redirect: Instagram

### My Savage

domain: my.savage-coworking.com

Flutter framework.  
Code is stored in folder "apps"  
Build files are stored in "public/{app-name}"
