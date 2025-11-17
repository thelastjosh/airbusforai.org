import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Create a Supabase client with service role key for server-side operations
// This bypasses RLS policies and should NEVER be exposed to the client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, jobTitle, affiliation } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Insert signature into database using service role client
    const { data, error } = await supabaseAdmin
      .from('signatures')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          job_title: jobTitle?.trim() || null,
          affiliation: affiliation?.trim() || null,
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to save signature' });
    }

    const signature = data[0];
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/verify?token=${signature.verification_token}`;

    // Validate email configuration
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return res.status(500).json({
        error: 'Email service is not configured. Please contact the administrator.'
      });
    }

    if (!process.env.RESEND_FROM_EMAIL) {
      console.error('RESEND_FROM_EMAIL is not configured');
      return res.status(500).json({
        error: 'Email service is not configured. Please contact the administrator.'
      });
    }

    // Send verification email via Resend
    try {
      const emailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: signature.email,
        subject: 'Verify your signature for Airbus for AI',
        html: `
          <h2>Verify Your Signature</h2>
          <p>Dear ${signature.name},</p>
          <p>Thank you for signing the Airbus for AI open letter. Please verify your email address by clicking the link below:</p>
          <p><a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px;">Verify My Signature</a></p>
          <p>Or copy and paste this URL into your browser:</p>
          <p>${verificationUrl}</p>
          <p>If you did not sign this letter, please ignore this email.</p>
          <br>
          <p>Best regards,<br>The Airbus for AI Team</p>
        `,
      });

      // Log the full response for debugging
      console.log('Resend API response:', JSON.stringify(emailResult, null, 2));

      // Check if the email was actually sent successfully
      if (emailResult.error) {
        console.error('Resend returned an error:', emailResult.error);

        // Delete the signature since we can't send verification email
        await supabaseAdmin
          .from('signatures')
          .delete()
          .eq('id', signature.id);

        return res.status(500).json({
          error: 'Failed to send verification email. Please try again or contact support if the problem persists.',
          details: process.env.NODE_ENV === 'development' ? emailResult.error.message : undefined
        });
      }

      if (!emailResult.data?.id) {
        console.error('Resend did not return an email ID:', emailResult);

        // Delete the signature since email sending is questionable
        await supabaseAdmin
          .from('signatures')
          .delete()
          .eq('id', signature.id);

        return res.status(500).json({
          error: 'Email sending status unclear. Please try again or contact support.',
          details: process.env.NODE_ENV === 'development' ? 'No email ID returned from Resend' : undefined
        });
      }

      console.log('Verification email sent successfully:', {
        emailId: emailResult.data.id,
        to: signature.email,
        timestamp: new Date().toISOString()
      });
    } catch (emailError) {
      console.error('Failed to send verification email (exception):', {
        error: emailError.message,
        details: emailError,
        to: signature.email,
        from: process.env.RESEND_FROM_EMAIL,
        timestamp: new Date().toISOString()
      });

      // Delete the signature since we can't send verification email
      await supabaseAdmin
        .from('signatures')
        .delete()
        .eq('id', signature.id);

      return res.status(500).json({
        error: 'Failed to send verification email. Please try again or contact support if the problem persists.',
        details: process.env.NODE_ENV === 'development' ? emailError.message : undefined
      });
    }

    return res.status(200).json({
      message: 'Signature submitted successfully. Please check your email to verify.',
      data: signature
    });

  } catch (error) {
    console.error('Error processing signature:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
