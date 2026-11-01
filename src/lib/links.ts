import { business, messages } from "@/config/site";
import { isVerified } from "@/config/types";

export const telLink = `tel:${business.phone}`;
export const mailLink = (subject = "Consultation enquiry — New Dawn Clinics", body?: string) =>
  `mailto:${business.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const waLink = (text: string = messages.whatsappDefault) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;

export const waTreatment = (treatment: string) =>
  waLink(
    `Hello, I would like to enquire about ${treatment} and booking a dermatology consultation with Dr. Aditya Tolat at New Dawn Clinics.`,
  );

/** Exact map link once verified, otherwise a Google Maps search (never invented coordinates). */
export const mapsLink = () => {
  if (isVerified(business.mapsUrl)) return business.mapsUrl.value;
  const q = isVerified(business.address)
    ? `New Dawn Clinics, ${business.address.value}`
    : "New Dawn Clinics, Bandra, Mumbai";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
};

/** "Book" buttons: a configured external booking page, otherwise the on-page enquiry form. */
export const bookHref = () => (isVerified(business.bookingUrl) ? business.bookingUrl.value : "/#contact");

export const siteUrl = () => (isVerified(business.website) ? business.website.value.replace(/\/$/, "") : null);
