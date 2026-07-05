"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/custom-components/ui/Input";
import { Textarea } from "@/custom-components/ui/Textarea";
import { Button } from "@/custom-components/ui/Button";
import { Alert } from "@/custom-components/ui/Alert";
import { useSubmitContactMutation } from "@/services/contactService";

const DETAILS = [
  { icon: Mail, label: "Email us", value: "support@shophub.com", sub: "We reply within a few hours" },
  { icon: Phone, label: "Call us", value: "+1 (800) 555-0142", sub: "Mon–Fri, 9am–6pm EST" },
  { icon: MapPin, label: "Visit us", value: "123 Market Street, San Francisco, CA", sub: "By appointment only" },
  { icon: Clock, label: "Support hours", value: "Mon–Fri · 9am–6pm EST", sub: "Weekends: email only" },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };

export function ContactSection() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitContact, { isLoading: submitting }] = useSubmitContactMutation();

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.email.trim()) next.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!form.subject.trim()) next.subject = "Please add a subject";
    if (!form.message.trim()) next.message = "Please tell us how we can help";
    else if (form.message.trim().length < 10) next.message = "A little more detail helps us help you";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;
    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      }).unwrap();
      setSent(true);
      setForm(EMPTY);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string | string[] } };
      const msg = error?.data?.message;
      setApiError(Array.isArray(msg) ? msg[0] : msg ?? "Couldn't send your message. Please try again.");
    }
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-transparent py-14 lg:py-20">
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-violet-200/40 dark:bg-violet-900/20 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-violet-100 dark:bg-violet-900/40 mb-4">
            <MessageCircle className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3">
            Get in touch
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Questions about an order, a product, or your account? Send us a message and the team will get right back to you.
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-5 gap-8">
        {/* Contact details */}
        <div className="lg:col-span-2 space-y-4">
          {DETAILS.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 surface-glass p-5"
            >
              <div className="shrink-0 h-11 w-11 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center">
                <d.icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">{d.label}</p>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mt-0.5">{d.value}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{d.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 surface-glass p-6 sm:p-8">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30 mb-4">
                  <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Message sent!</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
                  Thanks for reaching out. We&apos;ve received your message and will reply to your email shortly.
                </p>
                <Button variant="secondary" onClick={() => setSent(false)}>Send another message</Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">Send us a message</h2>
                {apiError && (
                  <Alert variant="danger" onClose={() => setApiError(null)}>{apiError}</Alert>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Your name" value={form.name} onChange={update("name")} error={errors.name} placeholder="Jane Doe" required />
                  <Input label="Email" type="email" value={form.email} onChange={update("email")} error={errors.email} placeholder="jane@example.com" required />
                </div>
                <Input label="Subject" value={form.subject} onChange={update("subject")} error={errors.subject} placeholder="How can we help?" required />
                <Textarea label="Message" value={form.message} onChange={update("message")} error={errors.message} rows={6} placeholder="Tell us a bit more…" required />
                <Button type="submit" variant="primary" fullWidth loading={submitting}>
                  {submitting ? "Sending…" : "Send message"}
                </Button>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
                  By sending this you agree to be contacted about your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
