import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

export function contactFormEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  practiceArea?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html dir="rtl">
    <head><meta charset="utf-8"></head>
    <body style="font-family: Tahoma, sans-serif; direction: rtl;">
      <h2>پیام جدید از فرم تماس</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; font-weight: bold;">نام:</td><td>${data.name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">ایمیل:</td><td>${data.email}</td></tr>
        ${data.phone ? `<tr><td style="padding: 8px; font-weight: bold;">تلفن:</td><td>${data.phone}</td></tr>` : ''}
        <tr><td style="padding: 8px; font-weight: bold;">موضوع:</td><td>${data.subject}</td></tr>
        ${data.practiceArea ? `<tr><td style="padding: 8px; font-weight: bold;">حوزه:</td><td>${data.practiceArea}</td></tr>` : ''}
        <tr><td style="padding: 8px; font-weight: bold;">پیام:</td><td>${data.message}</td></tr>
      </table>
    </body>
    </html>
  `;
}

export function consultationConfirmationEmail(name: string, date: string): string {
  return `
    <!DOCTYPE html>
    <html dir="rtl">
    <head><meta charset="utf-8"></head>
    <body style="font-family: Tahoma, sans-serif; direction: rtl;">
      <h2>تایید درخواست مشاوره</h2>
      <p>جناب/سرکار خانم ${name}،</p>
      <p>درخواست مشاوره حقوقی شما با موفقیت ثبت شد.</p>
      <p>تاریخ و زمان مشاوره: ${date}</p>
      <p>کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.</p>
      <br>
      <p>با احترام،</p>
      <p>دفتر وکالت احمدزاده</p>
    </body>
    </html>
  `;
}

export function passwordResetEmail(name: string, resetLink: string): string {
  return `
    <!DOCTYPE html>
    <html dir="rtl">
    <head><meta charset="utf-8"></head>
    <body style="font-family: Tahoma, sans-serif; direction: rtl;">
      <h2>بازیابی رمز عبور</h2>
      <p>جناب/سرکار خانم ${name}،</p>
      <p>برای بازیابی رمز عبور خود، روی لینک زیر کلیک کنید:</p>
      <p><a href="${resetLink}" style="background: #102a43; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">بازیابی رمز عبور</a></p>
      <p>این لینک تا ۲۴ ساعت معتبر است.</p>
      <p>اگر شما این درخواست را ارسال نکرده‌اید، این ایمیل را نادیده بگیرید.</p>
      <br>
      <p>با احترام،</p>
      <p>دفتر وکالت احمدزاده</p>
    </body>
    </html>
  `;
}

export function invoiceEmail(name: string, invoiceNumber: string, amount: string, dueDate: string): string {
  return `
    <!DOCTYPE html>
    <html dir="rtl">
    <head><meta charset="utf-8"></head>
    <body style="font-family: Tahoma, sans-serif; direction: rtl;">
      <h2>صورتحساب جدید</h2>
      <p>جناب/سرکار خانم ${name}،</p>
      <p>صورتحساب جدیدی برای شما صادر شده است.</p>
      <table style="border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold;">شماره صورتحساب:</td><td>${invoiceNumber}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">مبلغ:</td><td>${amount}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">سررسید پرداخت:</td><td>${dueDate}</td></tr>
      </table>
      <br>
      <p>با احترام،</p>
      <p>دفتر وکالت احمدزاده</p>
    </body>
    </html>
  `;
}
