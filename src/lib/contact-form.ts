import * as z from "zod";
import { sendInquiryAction } from "@/app/actions/send-inquiry";

// Contact form schema - reusable across components
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(500, { message: "Message cannot exceed 500 characters." }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Toast configuration types
export interface ToastFunction {
  (options: {
    title: string;
    description: string;
    variant?: "default" | "destructive";
  }): void;
}

export interface FormResetFunction {
  (): void;
}

// Reusable contact form submission handler
export async function handleContactFormSubmit(
  values: ContactFormData,
  toast: ToastFunction,
  resetForm?: FormResetFunction
): Promise<void> {
  try {
    const result = await sendInquiryAction(values);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: result.message, // Use message from server action
        variant: "default",
      });
      
      // Reset form if reset function is provided
      if (resetForm) {
        resetForm();
      }
    } else {
      toast({
        title: "Error Sending Message",
        description:
          result.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error("Contact form submission error:", error);
    toast({
      title: "Error Sending Message",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  }
}

// Hook-like wrapper for easier integration with React Hook Form
export function createContactFormHandler(
  toast: ToastFunction,
  resetForm?: FormResetFunction
) {
  return async (values: ContactFormData) => {
    await handleContactFormSubmit(values, toast, resetForm);
  };
}
