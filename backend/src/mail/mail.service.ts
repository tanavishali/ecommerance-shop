import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    const { EMAIL_USER, EMAIL_PASS } = process.env;
    if (EMAIL_USER && EMAIL_PASS) {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
        // Render's network lacks outbound IPv6 — force IPv4 or connects hang with ENETUNREACH.
        family: 4,
      } as any);
    } else {
      this.logger.warn('EMAIL_USER / EMAIL_PASS not set — email notifications are disabled.');
    }
  }

  async send(subject: string, html: string): Promise<void> {
    if (!this.transporter) return;
    const to = process.env.NOTIFY_EMAIL || process.env.EMAIL_USER;
    try {
      await this.transporter.sendMail({
        from: `"ShopHub Notifications" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(`Failed to send notification email: ${message}`);
    }
  }
}
