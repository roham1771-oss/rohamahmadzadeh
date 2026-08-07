'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/validations';
import toast from 'react-hot-toast';

interface ContactFormProps {
  dict: any;
  locale: string;
}

export function ContactForm({ dict, locale }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success(dict?.contact?.form?.success || 'Message sent successfully');
        reset();
      } else {
        toast.error(dict?.contact?.form?.error || 'Error sending message');
      }
    } catch {
      toast.error(dict?.contact?.form?.error || 'Error sending message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label">{dict?.contact?.form?.name || 'Name'}</label>
          <input {...register('name')} className="input-field" />
          {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message as string}</p>}
        </div>
        <div>
          <label className="label">{dict?.contact?.form?.email || 'Email'}</label>
          <input {...register('email')} type="email" className="input-field" />
          {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message as string}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label">{dict?.contact?.form?.phone || 'Phone'}</label>
          <input {...register('phone')} className="input-field" dir="ltr" />
          {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone.message as string}</p>}
        </div>
        <div>
          <label className="label">{dict?.contact?.form?.practiceArea || 'Practice Area'}</label>
          <select {...register('practiceArea')} className="input-field">
            <option value="">---</option>
            <option value="civil">{dict?.services?.civil || 'Civil Law'}</option>
            <option value="criminal">{dict?.services?.criminal || 'Criminal Law'}</option>
            <option value="family">{dict?.services?.family || 'Family Law'}</option>
            <option value="commercial">{dict?.services?.commercial || 'Commercial Law'}</option>
            <option value="property">{dict?.services?.property || 'Property Law'}</option>
          </select>
        </div>
      </div>
      <div>
        <label className="label">{dict?.contact?.form?.subject || 'Subject'}</label>
        <input {...register('subject')} className="input-field" />
        {errors.subject && <p className="text-red-500 text-xs mt-1.5">{errors.subject.message as string}</p>}
      </div>
      <div>
        <label className="label">{dict?.contact?.form?.message || 'Message'}</label>
        <textarea {...register('message')} rows={5} className="input-field resize-none" />
        {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message.message as string}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="group btn-primary w-full md:w-auto"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {dict?.common?.loading || 'Sending...'}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {dict?.contact?.form?.submit || 'Send Message'}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        )}
      </button>
    </form>
  );
}
