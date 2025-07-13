import { Resend } from 'resend';

const resend = new Resend(process.env.Resend_Api);

export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'TrueFeedback <onboarding@resend.dev>',
      to: [email],
      subject: 'Verify your email',
      html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Email send error:', err);
    throw err;
  }
}
