'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';

interface WhyUsSectionProps {
  dict: any;
  locale: string;
}

export function WhyUsSection({ dict, locale }: WhyUsSectionProps) {
  const whyUs = dict?.home?.whyUs || {};

  const features = [
    {
      key: 'experience',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: 'from-accent-500 to-accent-600',
    },
    {
      key: 'commitment',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      key: 'confidentiality',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
    },
    {
      key: 'results',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          title={whyUs.title || 'Why Choose Us'}
          subtitle={whyUs.subtitle || 'Committed to Justice'}
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card p-8 text-center hover-lift group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-3">{whyUs[feature.key] || feature.key}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{whyUs[`${feature.key}Desc`] || ''}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
