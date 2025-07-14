import { useState } from "react";
import {
  initSendContactMessage,
  ISendContactMessageRequestData,
} from "@/services/contact/request";

export interface IContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<IContactFormData>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
    setSubmitted(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Map form data to service interface
      const requestData: ISendContactMessageRequestData = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await initSendContactMessage(requestData);

      // Check if the response indicates success
      if (response && !response.error) {
        setSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          resetForm();
        }, 3000);
      } else {
        throw new Error(response?.message || "Failed to send message");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred while sending the message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    submitted,
    error,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};
