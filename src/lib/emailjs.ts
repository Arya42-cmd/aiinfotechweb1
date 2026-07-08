import emailjs from '@emailjs/browser';

export interface EmailJSMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;

const getEmailJsConfig = () => {
  if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
    throw new Error(
      'EmailJS configuration is missing. Please set VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, and VITE_EMAILJS_TEMPLATE_ID.'
    );

  }

  return { publicKey: PUBLIC_KEY, serviceId: SERVICE_ID, templateId: TEMPLATE_ID };
};

export const sendEmail = async (payload: EmailJSMessage) => {
  const { publicKey, serviceId, templateId } = getEmailJsConfig();

  const templateParams = {
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
  };

  return emailjs.send(serviceId, templateId, templateParams, publicKey);
};
