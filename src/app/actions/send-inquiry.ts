
'use server';

import * as z from "zod";
import nodemailer from "nodemailer";

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

  const hostEmail = 'business.siriandres@gmail.com'; // Host's email - recipient
  const gmailUser = process.env.GMAIL_USER; // Your Gmail address (sender)
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD; // Your Gmail App Password

  if (!gmailUser || !gmailAppPassword) {
    console.error('Gmail credentials not configured in environment variables.');
    return {
      success: false,
      message: 'Email sending is not configured on the server. Please contact support.',
    };
  }

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
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const mailOptions = {
    from: `"${name} (Kirei Homestay Inquiry)" <${gmailUser}>`, // Display name for the sender
    replyTo: email, // Set the Reply-To header to the user's email
    to: hostEmail,
    subject: subject,
    text: emailTextBody,
    html: emailHtmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Inquiry email sent successfully to:', hostEmail);
    return { success: true, message: 'Inquiry sent successfully!' };
  } catch (error) {
    console.error('Email sending failed:', error);
    // It's good practice to avoid exposing too much detail about the error to the client.
    return { success: false, message: 'An error occurred while sending the inquiry. Please try again later.' };
  }
}
