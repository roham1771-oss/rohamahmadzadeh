import { SectionHeader } from '@/components/shared/SectionHeader';
import { ServiceCard } from '@/components/shared/ServiceCard';

interface ServicesPreviewProps {
  dict: any;
  locale: string;
  services: any[];
}

export function ServicesPreview({ dict, locale, services }: ServicesPreviewProps) {
  const servicesDict = dict?.home?.services || {};

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          title={servicesDict.title || dict?.services?.title || 'Legal Services'}
          subtitle={servicesDict.subtitle || dict?.services?.subtitle || 'Comprehensive legal services'}
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} locale={locale} />
          ))}
        </div>
        {services.length === 0 && (
          <p className="text-center text-muted-foreground mt-12">Services coming soon.</p>
        )}
      </div>
    </section>
  );
}
