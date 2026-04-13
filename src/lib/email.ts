export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, html }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error calling email API:', error);
    return { success: false, error };
  }
}

export const emailTemplates = {
  welcome: (name: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h1 style="color: #006D5B; text-align: center;">Welcome to Eminixstore</h1>
      <p>Hello ${name},</p>
      <p>Welcome to the Eminix family! We're thrilled to have you as part of our elite community of fashion and tech enthusiasts.</p>
      <p>Explore our latest collections and enjoy exclusive member benefits.</p>
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://eminixstore.com" style="background-color: #006D5B; color: white; padding: 12px 24px; text-decoration: none; rounded: 50px; font-weight: bold;">Start Shopping</a>
      </div>
      <p style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">&copy; 2026 Eminixstore. All rights reserved.</p>
    </div>
  `,
  orderConfirmation: (orderId: string, total: number) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h1 style="color: #006D5B; text-align: center;">Order Confirmed</h1>
      <p>Thank you for your order!</p>
      <p>Your order <strong>#${orderId.toUpperCase()}</strong> has been successfully placed and is being processed.</p>
      <p><strong>Total Amount:</strong> $${total.toFixed(2)}</p>
      <p>We'll notify you as soon as your package is on its way.</p>
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://eminixstore.com/account/orders" style="background-color: #006D5B; color: white; padding: 12px 24px; text-decoration: none; rounded: 50px; font-weight: bold;">View Order Status</a>
      </div>
      <p style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">&copy; 2026 Eminixstore. All rights reserved.</p>
    </div>
  `,
  shippingConfirmation: (orderId: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h1 style="color: #006D5B; text-align: center;">Your Order is on its Way!</h1>
      <p>Great news!</p>
      <p>Your order <strong>#${orderId.toUpperCase()}</strong> has been shipped and is heading your way.</p>
      <p>You can track your package using the link below.</p>
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://eminixstore.com/account/orders/${orderId}" style="background-color: #D4AF37; color: #006D5B; padding: 12px 24px; text-decoration: none; rounded: 50px; font-weight: bold;">Track Package</a>
      </div>
      <p style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">&copy; 2026 Eminixstore. All rights reserved.</p>
    </div>
  `,
  deliveryConfirmation: (orderId: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h1 style="color: #006D5B; text-align: center;">Order Delivered</h1>
      <p>Your order <strong>#${orderId.toUpperCase()}</strong> has been delivered!</p>
      <p>We hope you love your new Eminix items. If you have any questions or need assistance, our team is always here to help.</p>
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://eminixstore.com/account/orders/${orderId}" style="background-color: #006D5B; color: white; padding: 12px 24px; text-decoration: none; rounded: 50px; font-weight: bold;">Rate Your Experience</a>
      </div>
      <p style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">&copy; 2026 Eminixstore. All rights reserved.</p>
    </div>
  `,
  contactForm: (name: string, email: string, message: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h1 style="color: #006D5B; text-align: center;">New Contact Message</h1>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #006D5B;">
        ${message}
      </div>
      <p style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">&copy; 2026 Eminixstore. All rights reserved.</p>
    </div>
  `,
};
