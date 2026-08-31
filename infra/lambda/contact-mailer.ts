import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing required fields: name, email, or message' }),
      };
    }

    const destinationEmail = process.env.DESTINATION_EMAIL;
    const sourceEmail = process.env.SOURCE_EMAIL;

    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [destinationEmail!],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `New message from Portfolio Contact Form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Portfolio Contact from ${name}`,
        },
      },
      Source: sourceEmail!,
      ReplyToAddresses: [email],
    });

    await sesClient.send(command);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ success: true, message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
