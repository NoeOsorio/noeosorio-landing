import { HiLightningBolt, HiClock, HiCalendar } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface QuoteCalculatorProps {
  selectedFeatures: string[];
  features: {
    title: string;
    multiSelect: boolean;
    options: {
      id: string;
      label: string;
      price: number;
      time: number;
    }[];
  }[];
  serviceType: string;
}

const QuoteCalculator = ({ selectedFeatures, features, serviceType }: QuoteCalculatorProps) => {
  const calculateTotal = () => {
    return features.reduce((total, feature) => {
      const selectedOptions = feature.options.filter(option => 
        selectedFeatures.includes(option.id)
      );
      return total + selectedOptions.reduce((sum, option) => sum + option.price, 0);
    }, 0);
  };

  const calculateTimeEstimate = () => {
    // Calculamos el tiempo total sumando los tiempos de las features seleccionadas
    const totalTime = features.reduce((total, feature) => {
      const selectedOptions = feature.options.filter(option => 
        selectedFeatures.includes(option.id)
      );
      
      if (feature.multiSelect) {
        // Para features adicionales, sumamos los tiempos
        return total + selectedOptions.reduce((sum, option) => sum + option.time, 0);
      } else {
        // Para features principales, tomamos el tiempo más largo (desarrollo paralelo)
        const maxTime = Math.max(...selectedOptions.map(option => option.time), 0);
        return total + maxTime;
      }
    }, 0);

    // Agregamos un margen de 2 semanas para imprevistos
    return {
      min: totalTime,
      max: totalTime + 2
    };
  };

  const selectedCount = selectedFeatures.length;
  const total = calculateTotal();
  const timeEstimate = calculateTimeEstimate();

  return (
    <div className="bg-zinc-800/50 backdrop-blur-xl rounded-2xl border border-zinc-700/50 overflow-hidden">
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-6">
          Cotización Estimada
        </h3>

        {selectedCount === 0 ? (
          <div className="text-center py-8">
            <p className="text-zinc-400 mb-4">
              Selecciona las características que necesitas para ver el precio estimado
            </p>
            <div className="w-16 h-16 bg-zinc-700/50 rounded-full mx-auto flex items-center justify-center">
              <HiLightningBolt className="w-8 h-8 text-zinc-500" />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Selected Features Summary */}
            <div className="space-y-3">
              {features.map(feature => {
                const selected = feature.options.filter(option => 
                  selectedFeatures.includes(option.id)
                );
                if (selected.length === 0) return null;
                
                return (
                  <div key={feature.title}>
                    <p className="text-zinc-400 text-sm mb-2">{feature.title}</p>
                    {selected.map(option => (
                      <div 
                        key={option.id}
                        className="flex justify-between items-center py-2 border-b border-zinc-700/50 last:border-0"
                      >
                        <span className="text-white">{option.label}</span>
                        <span className="text-lime-300">${option.price}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Timeline Estimate actualizado */}
            <div className="flex items-center gap-3 text-zinc-400">
              <HiClock className="w-5 h-5" />
              <span>
                Tiempo estimado: {timeEstimate.min}-{timeEstimate.max} semanas
              </span>
            </div>

            {/* Total */}
            <div className="pt-6 border-t border-zinc-700/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white">Total Estimado</span>
                <span className="text-2xl font-bold text-lime-300">
                  ${total.toLocaleString()}
                </span>
              </div>
              
              <p className="text-sm text-zinc-400 mb-6">
                * Los precios son aproximados y pueden variar según requerimientos específicos
              </p>

              <Link
                to={`/contact?service=${serviceType}&features=${selectedFeatures.join(',')}&total=${total}`}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-lime-300 hover:bg-lime-400 text-zinc-900 rounded-lg font-medium transition-colors"
              >
                <HiCalendar className="w-5 h-5" />
                <span>Agendar Consulta</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteCalculator; 