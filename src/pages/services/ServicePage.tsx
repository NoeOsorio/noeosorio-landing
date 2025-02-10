import { motion } from 'framer-motion';
import { useState } from 'react';
import QuoteCalculator from '../../components/services/QuoteCalculator';
import { ServiceObjectives } from '../../components/services/ServiceObjectives';
import { ServiceDeliverables } from '../../components/services/ServiceDeliverables';
import { ServiceFAQ } from '../../sections/services/ServiceFAQ';

interface ServiceFeatureOption {
  id: string;
  label: string;
  price: number;
  time: number;
  description?: string;
}

interface ServiceFeature {
  title: string;
  multiSelect: boolean;
  options: ServiceFeatureOption[];
}

interface CaseStudy {
  title: string;
  description: string;
  image: string;
  link?: string;
  tags: string[];
}

interface Objective {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
}

interface Deliverable {
  id: string;
  type: 'code' | 'document' | 'asset';
  title: string;
  description: string;
  items: string[];
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface ServicePageProps {
  title: string;
  description: string;
  features: ServiceFeature[];
  caseStudies: CaseStudy[];
  serviceType: string;
  objectives: Objective[];
  deliverables: Deliverable[];
  faqs: FAQ[];
}

export const ServicePage = ({ 
  title, 
  description, 
  features, 
  caseStudies,
  serviceType,
  objectives,
  deliverables,
  faqs
}: ServicePageProps) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (featureId: string, feature: ServiceFeature) => {
    if (feature.multiSelect) {
      if (selectedFeatures.includes(featureId)) {
        setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
      } else {
        setSelectedFeatures([...selectedFeatures, featureId]);
      }
    } else {
      const otherSelections = selectedFeatures.filter(id => 
        !feature.options.some(option => option.id === id)
      );
      if (!selectedFeatures.includes(featureId)) {
        setSelectedFeatures([...otherSelections, featureId]);
      }
    }
  };

  return (
    <>
      {/* Hero Section con el mismo estilo que Services */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-lime-500/5 via-transparent to-transparent" />
          <div 
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(148 163 184 / 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(148 163 184 / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '4rem 4rem'
            }}
          />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/20 rounded-full filter blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px]" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6"
            >
              <div className="w-2 h-2 bg-lime-300 rounded-full" />
              <p className="text-lime-300 font-medium">Solución Especializada</p>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {description}
            </motion.p>
          </div>

          {/* Features & Quote Calculator */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">
              Características y Opciones
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
                {features.map((feature) => (
                  <div 
                    key={feature.title} 
                    className="bg-zinc-800/50 backdrop-blur-xl rounded-2xl p-8 border border-zinc-700/50"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">{feature.title}</h3>
                    <div className="space-y-4">
                      {feature.options.map((option) => {
                        const isSelected = selectedFeatures.includes(option.id);
                        return (
                          <button
                            key={option.id}
                            onClick={() => toggleFeature(option.id, feature)}
                            className={`w-full text-left p-6 rounded-xl transition-all ${
                              isSelected 
                                ? 'bg-lime-300/10 border-2 border-lime-300/50' 
                                : 'bg-zinc-900/50 border border-zinc-800 hover:border-lime-300/20'
                            }`}
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <p className={`font-medium mb-1 transition-colors ${
                                  isSelected ? 'text-lime-300' : 'text-white'
                                }`}>
                                  {option.label}
                                </p>
                                {option.description && (
                                  <p className="text-zinc-400 text-sm">
                                    {option.description}
                                  </p>
                                )}
                              </div>
                              <p className={`text-sm transition-colors ${
                                isSelected ? 'text-lime-300' : 'text-zinc-400'
                              }`}>
                                Desde ${option.price}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky top-24"
              >
                <QuoteCalculator 
                  selectedFeatures={selectedFeatures}
                  features={features}
                  serviceType={serviceType}
                />
              </motion.div>
            </div>

            {/* Case Studies con el mismo estilo de las cards */}
            {caseStudies.length > 0 && (
              <div className="mt-24">
                <h2 className="text-2xl font-bold text-white mb-12 text-center">
                  Proyectos Destacados
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {/* Implementar grid de casos de estudio */}
                </div>
              </div>
            )}

            <section className="mt-24">
              <ServiceObjectives objectives={objectives} />
              <ServiceDeliverables deliverables={deliverables} />
              <ServiceFAQ faqs={faqs} />
            </section>
          </div>
        </div>
      </section>
    </>
  );
}; 