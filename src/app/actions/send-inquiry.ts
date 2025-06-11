
'use server';

import * as z from "zod";

// Define the schema for input validation on the server side
const inquiryFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message cannot exceed 500 characters." }),
});

type InquiryFormData = z.infer<typeof inquiryFormSchema>;

export async function sendInquiryAction(values: InquiryFormData): Promise<{ success: boolean; message: string }> {
  // Validate the input on the server
  const validatedFields = inquiryFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data. " + (validatedFields.error.issues.map(issue => issue.message).join('. ') || "Please check your input."),
    };
  }

  const { name, email, phone, message } = validatedFields.data;

  const hostEmail = 'business.siriandres@gmail.com'; // Host's email
  const subject = `New Inquiry from ${name} via Kirei Homestay Website`;
  
  const emailHtmlBody = `
    <p>You have received a new inquiry from your Kirei Homestay website:</p>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
    </ul>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
    <hr>
    <p><em>This is an automated message from the Kirei Homestay contact form.</em></p>
  `;

  const emailTextBody = `
    You have received a new inquiry from your Kirei Homestay website:

    Name: ${name}
    Email: ${email}
    Phone: ${phone || 'Not provided'}
    
    Message:
    ${message}

    ---
    This is an automated message from the Kirei Homestay contact form.
  `;
  
  console.log('--- Attempting to send email (simulation) ---');
  console.log('To:', hostEmail);
  console.log('Subject:', subject);
  console.log('HTML Body:', emailHtmlBody);
  console.log('Text Body:', emailTextBody);
  console.log('--- End of email simulation ---');

  // **IMPORTANT**: Actual email sending logic needs to be implemented here.
  // This could involve using a third-party email service like SendGrid, Resend, AWS SES, etc.
  // For example:
  //
  // try {
  //   // const sendEmailResponse = await emailService.send({
  //   //   to: hostEmail,
  //   //   from: 'noreply@yourdomain.com', // Configure a sending email address
  //   //   subject: subject,
  //   //   html: emailHtmlBody,
  //   //   text: emailTextBody,
  //   // });
  //   // if (sendEmailResponse.success) {
  //   //   return { success: true, message: 'Inquiry sent successfully!' };
  //   // } else {
  //   //   return { success: false, message: 'Failed to send email via service.' };
  //   // }
  // } catch (error) {
  //   console.error('Email sending failed:', error);
  //   return { success: false, message: 'An error occurred while sending the inquiry. Please try again later.' };
  // }

  // For now, we'll simulate success:
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return { success: true, message: 'Inquiry sent successfully! (Simulation)' };
}
