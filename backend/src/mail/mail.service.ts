import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dns from 'node:dns';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly enabled: boolean;

  constructor() {
    this.enabled = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);
    if (!this.enabled) {
      this.logger.warn('EMAIL_USER / EMAIL_PASS not set — email notifications are disabled.');
    }
  }

  async send(subject: string, html: string): Promise<void> {
    if (!this.enabled) return;
    const { EMAIL_USER, EMAIL_PASS } = process.env;
    const to = process.env.NOTIFY_EMAIL || EMAIL_USER;

    try {
      // nodemailer ignores a `family` transport option and its own IPv4/IPv6 resolution
      // can still hand back an IPv6 address on hosts (e.g. Render) that block outbound
      // IPv6 — resolve smtp.gmail.com to an IPv4 literal ourselves and connect to that.
      const { address } = await dns.promises.lookup('smtp.gmail.com', { family: 4 });

      const transporter = nodemailer.createTransport({
        host: address,
        port: 465,
        secure: true,
        tls: { servername: 'smtp.gmail.com' },
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"ShopHub Notifications" <${EMAIL_USER}>`,
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
