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
        service: 'gmail',
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      });
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
      this.logger.error(`Failed to send notification email: ${err.message}`);
    }
  }
}
