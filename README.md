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

[Functions Readme](functions/README.functions.md)

## Database

Real-time connections like bookings with Firestore.

<!-- TODO Relational data like user data PostgreSQL. -->

Data structure and models:

- **user** Collection:
  - uid string
  - first_name string
  - last_name string
  - contact_email string
  - contact_phone string
  - signup_email string | null
  - signup_phone string | null
  - phone_whatsapp string | null
  - photo_url string | null
  - membership_status string
  - membership_types string[]
  - available_credits number | null
  - joined_at timestamp
  - member_data_id string | null
  - request_invoice boolean
  - invoice_data map:
    - invoice_nif string | null
    - invoice_name string | null
    - invoice_address string | null
    - invoice_address2 string | null
    - invoice_city string | null
    - invoice_state string | null
    - invoice_postalcode string | null
    - invoice_country string | null
  - **invoices** SubCollection:
    - invoice_id string
    - user_id string
  - **memberships** SubCollection:
    - membership_id string
    - start_date timestamp
    - end_date timestamp
    - user_id string
    - active boolean
    - renew_membership boolean
    - type string
    - price double
    - discount_number double | null
    - discount_percent double | null
    - currency string
    - payment_method_id string
    - booking_credits string | null
    - booking_credits_used string | null
    - booking_credits_remaining string | null
    - workspace_id string | null
  - **bookings** SubCollection:
    - booking_id string
    - start_date_time timestamp
    - end_date_time timestamp
    - user_id string
    - workspace_id string
    - desk_id string
    - desk_number string
    - status string
  - **Payment_methods** SubCollection:
    - method_id string
    - type string
    - user_id string
    - provider string
    - last_four_digits string
    - expiry_date string
    - is_default boolean
    - stripe_payment_method_id string
- **Member_data** Collection:
  - id string
  - uid string
  - member_visible boolean
  - name string | null
  - company_name string | null
  - description string | null
  - categories string[]
  - website string | null
  - linkedin string | null
  - instagram string | null
  - facebook string | null
  - twitter string | null
  - youtube string | null
  - photo_url string | null
- **workspaces** Collection:
  - workspace_id string
  - name string
  - address string
  - city string
  - state string
  - postalcode string
  - desks_capacity integer
  - desks_available integer
  - meeting_rooms_available integer
  - amenities string[]
  - **desks** Subcollection:
    - desk_id string
    - workspace_id string
    - desk_number string
    - desk_type string
    - available boolean
    - assigned_to string | null
    - assigned_until timestamp | null
    - bookings object<start timestamp, end timestamp>[]
    - photo_url string | null
  - **meeting_rooms** SubCollection:
    - room_id string
    - workspace_id string
    - room_number string
    - available boolean
    - bookings object<start timestamp, end timestamp>[]
    - photo_url string | null
- **feedback** Collection:
- **payments** Collection:
- **memberships** Collection:
  - id string
  - name string
  - description string
  - amenities_included string[]
  - active boolean
  - price double
  - photo_url string | null
- **check_in_out_sessions** Collection:
  - id string
  - uid string
  - checked_in boolean
  - date_time timestamp
  - workspace_id string

## Firebase Storage

## Firebase Hosting

### Qr Codes

Domain: qr.savage-coworking.com  
target: qr

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
> location: Beermats & Trial day poster Redirect: trial day landing page

### My Savage

domain: my.savage-coworking.com  
target: my

Flutter framework.  
Code is stored in folder "apps"  
Build files are stored in "public/{app-name}"
