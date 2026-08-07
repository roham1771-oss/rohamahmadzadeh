'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

interface NewsletterFormProps {
  dict: any;
  variant?: 'default' | 'inline' | 'footer';
}

export function NewsletterForm({ dict, variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast.success(dict?.common?.newsletter || 'Subscribed successfully');
        setEmail('');
      }
    } catch {
      toast.error('Subscription failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict?.common?.emailPlaceholder || 'Email'}
          className="input-field flex-1"
          required
        />
        <button type="submit" disabled={isSubmitting} className="btn-primary shrink-0">
          {dict?.common?.subscribe || 'Subscribe'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={dict?.common?.emailPlaceholder || 'Email'}
        className="input-field"
        required
      />
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {dict?.common?.subscribe || 'Subscribe'}
      </button>
    </form>
  );
}
