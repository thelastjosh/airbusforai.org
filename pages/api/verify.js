import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with service role key for server-side operations
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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>Verification Failed</title>
            <style>
              body { font-family: system-ui; max-width: 600px; margin: 100px auto; padding: 20px; text-align: center; }
              h1 { color: #dc2626; }
            </style>
          </head>
          <body>
            <h1>Invalid Verification Link</h1>
            <p>The verification link is missing or invalid.</p>
          </body>
        </html>
      `);
    }

    // Find the signature with this verification token
    const { data: signature, error: fetchError } = await supabaseAdmin
      .from('signatures')
      .select('*')
      .eq('verification_token', token)
      .single();

    if (fetchError || !signature) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>Verification Failed</title>
            <style>
              body { font-family: system-ui; max-width: 600px; margin: 100px auto; padding: 20px; text-align: center; }
              h1 { color: #dc2626; }
            </style>
          </head>
          <body>
            <h1>Verification Failed</h1>
            <p>This verification link is invalid or has already been used.</p>
          </body>
        </html>
      `);
    }

    // Check if already verified
    if (signature.verified) {
      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>Already Verified</title>
            <style>
              body { font-family: system-ui; max-width: 600px; margin: 100px auto; padding: 20px; text-align: center; }
              h1 { color: #2563eb; }
              a { color: #2563eb; text-decoration: none; }
              a:hover { text-decoration: underline; }
            </style>
          </head>
          <body>
            <h1>Already Verified</h1>
            <p>Your signature has already been verified. Thank you for your support!</p>
            <p><a href="/">Return to the open letter</a></p>
          </body>
        </html>
      `);
    }

    // Update signature to verified
    const { error: updateError } = await supabaseAdmin
      .from('signatures')
      .update({ verified: true })
      .eq('verification_token', token);

    if (updateError) {
      console.error('Error verifying signature:', updateError);
      return res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>Verification Error</title>
            <style>
              body { font-family: system-ui; max-width: 600px; margin: 100px auto; padding: 20px; text-align: center; }
              h1 { color: #dc2626; }
            </style>
          </head>
          <body>
            <h1>Verification Error</h1>
            <p>An error occurred while verifying your signature. Please try again later.</p>
          </body>
        </html>
      `);
    }

    // Success!
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Signature Verified</title>
          <meta http-equiv="refresh" content="3;url=/" />
          <style>
            body { font-family: system-ui; max-width: 600px; margin: 100px auto; padding: 20px; text-align: center; }
            h1 { color: #059669; }
            .checkmark { font-size: 64px; color: #059669; }
            a { color: #2563eb; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="checkmark">✓</div>
          <h1>Signature Verified!</h1>
          <p>Thank you, ${signature.name}! Your signature has been verified and will now appear on the open letter.</p>
          <p>Redirecting you back to the letter in 3 seconds...</p>
          <p><a href="/">Click here if you are not redirected automatically</a></p>
        </body>
      </html>
    `);

  } catch (error) {
    console.error('Error processing verification:', error);
    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Error</title>
          <style>
            body { font-family: system-ui; max-width: 600px; margin: 100px auto; padding: 20px; text-align: center; }
            h1 { color: #dc2626; }
          </style>
        </head>
        <body>
          <h1>Internal Server Error</h1>
          <p>An unexpected error occurred. Please try again later.</p>
        </body>
      </html>
    `);
  }
}
