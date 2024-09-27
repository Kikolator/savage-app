/**
 * The Lead interface represents an incoming lead for a coworking
 * management platform. This model is used to store and process the details
 * of potential clients or users who express interest in the platform or
 * services offered.
 *
 * Fields:
 * - firstName: The first name of the lead.
 * - lastName: The last name of the lead.
 * - email: The lead's email address. This will be used for communication.
 * - phone: The lead's phone number for direct contact.
 * - countryCode: The country code associated with the lead's phone number,
 *   useful for international contact (e.g., 'US' for United States).
 * - startDate: The date when the lead is interested in starting or engaging
 * with the service.
 * - why: A short description explaining the lead's reason for interest,
 * or what they are looking for.
 * - subscriptionType: The id of the subscription they are enquiring for,
 * or where the form was filled in from.
 */
export interface Lead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  startDate: Date;
  why: string;
  subscriptionType: string;
}
/**
Example usage:
const newLead: Lead = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  countryCode: "US",
  startDate: new Date("2024-01-01"),
  why: "Looking for a flexible workspace to boost productivity.",
};
 */
