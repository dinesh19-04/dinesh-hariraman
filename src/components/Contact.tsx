import React, { useState } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Info,
  Sparkles,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { validateContactForm, ContactFormData } from '../utils/portfolio';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    messageId?: string;
    timestamp?: string;
    error?: string;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitResult({
          success: true,
          messageId: data.messageId,
          timestamp: data.timestamp,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormErrors({});
      } else {
        setSubmitResult({
          success: false,
          error: data.error || 'Failed to dispatch message. Please try again.',
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        error: 'Network connection issue. You can reach me directly via email or phone.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Info & Communication Channels */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Whether you are looking to collaborate on machine learning systems, discuss software engineering roles, or explore innovative embedded IoT ideas, my inbox and phone are open.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3.5 mb-8">
              {/* Email Card */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Direct Email</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-semibold font-mono text-slate-900 dark:text-slate-100 hover:text-cyan-500 truncate block"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                  title="Copy email address"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Direct Phone</div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-sm font-semibold font-mono text-slate-900 dark:text-slate-100 hover:text-emerald-500 truncate block"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                  title="Copy phone number"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedPhone ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* LinkedIn Card */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Professional Network</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
                      linkedin.com/in/dinesh-hariraman
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </a>

              {/* GitHub Card */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Open Source & Code</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
                      github.com/dinesh19-04
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </a>
            </div>

            {/* Architecture / Integration Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 mb-6">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    Connection Architecture & Integration
                  </div>
                  <p>
                    Active API: Connected to Express server-side endpoint <code className="text-cyan-600 dark:text-cyan-400 font-mono">/api/contact</code> with validation and receipt generation.
                  </p>
                  <p>
                    Serverless / Static option: Fully compatible with <span className="font-semibold text-slate-700 dark:text-slate-300">EmailJS</span> (<code className="text-slate-700 dark:text-slate-300 font-mono">emailjs.sendForm</code>) for direct email delivery to Gmail without running a backend server.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200/60 dark:border-slate-800">
            <span>Location: {PERSONAL_INFO.location}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Response Time: Typically within 24h</span>
          </div>
        </div>

        {/* Right Column: Functional Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              Fill in your details below. Messages are verified and logged directly for DINESH H.
            </p>

            {/* Success Feedback Banner */}
            {submitResult?.success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Message Successfully Dispatched!</span>
                </div>
                <p className="text-xs mb-2">
                  Thank you for reaching out. Your message has been received and routed to DINESH H.
                </p>
                <div className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
                  Receipt ID: {submitResult.messageId} · Timestamp: {new Date(submitResult.timestamp || '').toLocaleTimeString()}
                </div>
              </div>
            )}

            {/* Error Feedback Banner */}
            {submitResult && !submitResult.success && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Transmission Error</div>
                  <div>{submitResult.error}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                      formErrors.name
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/30'
                    } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
                  />
                  {formErrors.name && (
                    <span className="text-[11px] text-rose-500 mt-1 block">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@company.com"
                    className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                      formErrors.email
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/30'
                    } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
                  />
                  {formErrors.email && (
                    <span className="text-[11px] text-rose-500 mt-1 block">
                      {formErrors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. ML Engineering Role / Technical Collaboration"
                  className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                    formErrors.subject
                      ? 'border-rose-500 focus:ring-rose-500/30'
                      : 'border-slate-300 dark:border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/30'
                  } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
                />
                {formErrors.subject && (
                  <span className="text-[11px] text-rose-500 mt-1 block">
                    {formErrors.subject}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Message Content *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hello DINESH H, I came across your portfolio and wanted to reach out regarding..."
                  className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                    formErrors.message
                      ? 'border-rose-500 focus:ring-rose-500/30'
                      : 'border-slate-300 dark:border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/30'
                  } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all resize-y`}
                />
                {formErrors.message && (
                  <span className="text-[11px] text-rose-500 mt-1 block">
                    {formErrors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-400 text-center sm:text-left">
                  * All fields required
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-60 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
                >
                  <Send className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                  <span>{isSubmitting ? 'Dispatching Message...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
