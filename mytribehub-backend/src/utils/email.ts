import nodemailer from "nodemailer";
import { convert as htmlToText } from "html-to-text";

interface IUserForEmail {
  email: string;
  fullName?: string;
}

export class Email {
  to: string;
  firstName: string;
  url: string;
  from: string;

  constructor(user: IUserForEmail, url: string) {
    this.to = user.email;
    this.firstName = user.fullName ? user.fullName.split(" ")[0] : "User";
    this.url = url;
    this.from = `MyTribeHub <${process.env.EMAIL_FROM}>`;
  }

  newTransport(): nodemailer.Transporter {
    if (process.env.NODE_ENV === "production") {
      // sendGrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST as string,
      port: parseInt(process.env.EMAIL_PORT as string, 10),
      auth: {
        user: process.env.EMAIL_USERNAME as string,
        pass: process.env.EMAIL_PASSWORD as string,
      },
    });
  }

  // send the actual email
  async send(
    subject: string,
    messageHtml: string,
    messageText: string
  ): Promise<void> {
    const html = messageHtml;

    // define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: messageText || htmlToText(html),
    };

    // create a transport and send email
    await this.newTransport().sendMail(mailOptions);
    console.log(`Email sent to ${this.to} with subject : ${subject}`);
  }

  async sendWelcome() {
    const subject = "Welcome to Your App Family!";
    const htmlContent = `
      <h1>Welcome, ${this.firstName}!</h1>
      <p>We're so excited to have you on board.</p>
      <p>You can start by exploring your dashboard: <a href="${this.url}">Go to Dashboard</a></p>
      <p>If you have any questions, feel free to reply to this email.</p>
    `;
    const textContent = `Welcome, ${this.firstName}!\nWe're so excited to have you on board.\nYou can start by exploring your dashboard: ${this.url}\nIf you have any questions, feel free to reply to this email.`;

    await this.send(subject, htmlContent, textContent);
  }

  //  sendPasswordReset()
  async sendPasswordReset() {
    const subject = "Your password reset token (valid for only 10 minutes)";
    const htmlContent = `
      <h1>Hello, ${this.firstName}</h1>
      <p>Forgot your password? No worries! Use this link to reset it:</p>
      <p><a href="${this.url}">Reset Your Password</a></p>
      <p>This link is valid for 10 minutes. If you didn't request a password reset, please ignore this email.</p>
    `;
    const textContent = `Hello, ${this.firstName},\nForgot your password? No worries! Use this link to reset it: ${this.url}\nThis link is valid for 10 minutes. If you didn't request a password reset, please ignore this email.`;

    await this.send(subject, htmlContent, textContent);
  }
}
