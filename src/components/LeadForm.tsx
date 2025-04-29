import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useToast } from "../hooks/use-toast";
import { submitLeadForm } from "../services/api";

interface LeadFormProps {
  campaignId: string;
  onSuccess?: () => void;
  buttonText?: string;
  description?: string;
}

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre es obligatorio y debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
  company: z.string().optional(),
  role: z.string().optional(),
});

export function LeadForm({ campaignId, buttonText = "Agendar Consultoría", description }: LeadFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);
      await submitLeadForm({
        ...values,
        campaignId,
        company: values.company || "",
        role: values.role || "",
      });
      toast({
        title: "¡Registro exitoso!",
        description: "Gracias por tu interés. Nos pondremos en contacto contigo pronto.",
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto px-8 py-10 bg-gradient-to-b from-zinc-900 via-zinc-900/95 to-zinc-900
        border border-lime-900/50 shadow-[0_0_45px_-5px_rgba(132,204,22,0.15)] rounded-xl backdrop-blur-sm"
    >
      {isSuccess && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 mb-8 bg-lime-500/10 rounded-lg border-2 border-lime-500/20"
        >
          <div className="text-lime-400 text-4xl mb-4">🎯</div>
          <h4 className="text-lime-400 font-semibold mb-3">¡Excelente decisión!</h4>
          <p className="text-lime-300/80 mb-4">
            Nos pondremos en contacto contigo pronto para agendar tu consultoría estratégica.
          </p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="text-center space-y-3">
          <h3 className="text-3xl font-bold text-white">¡Agenda tu Consultoría!</h3>
          <p className="text-zinc-300 px-4">{description}</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-lime-300">
              Nombre completo *
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Juan Pérez"
              className="w-full px-5 py-3.5 rounded-lg bg-zinc-800/80 text-white placeholder-zinc-500
                border-2 border-zinc-700 focus:outline-none focus:border-lime-500 hover:border-lime-600/50
                transition-all duration-200"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-lime-300">
              Correo empresarial *
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="juan@tuempresa.com"
              className="w-full px-5 py-3.5 rounded-lg bg-zinc-800/80 text-white placeholder-zinc-500
                border-2 border-zinc-700 focus:outline-none focus:border-lime-500 hover:border-lime-600/50
                transition-all duration-200"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="block text-sm font-medium text-lime-300">
              Empresa (opcional)
            </label>
            <input
              {...register("company")}
              type="text"
              id="company"
              placeholder="Nombre de tu empresa"
              className="w-full px-5 py-3.5 rounded-lg bg-zinc-800/80 text-white placeholder-zinc-500
                border-2 border-zinc-700 focus:outline-none focus:border-lime-500 hover:border-lime-600/50
                transition-all duration-200"
              disabled={isSubmitting}
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-lime-300">
              Cargo (opcional)
            </label>
            <input
              {...register("role")}
              type="text"
              id="role"
              placeholder="Director / Gerente / etc."
              className="w-full px-5 py-3.5 rounded-lg bg-zinc-800/80 text-white placeholder-zinc-500
                border-2 border-zinc-700 focus:outline-none focus:border-lime-500 hover:border-lime-600/50
                transition-all duration-200"
              disabled={isSubmitting}
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
        </div>

      {!isSuccess && (
          <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full px-6 py-4 text-white bg-gradient-to-r from-lime-500 to-lime-600
            rounded-lg font-semibold hover:from-lime-400 hover:to-lime-500
            disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
            transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          {isSubmitting ? 'Enviando...' : buttonText}
        </button>
      )}

        <p className="text-center text-zinc-400 text-sm px-4">
          Tus datos están seguros. Solo los utilizaremos para contactarte sobre la consultoría.
        </p>
      </form>
    </motion.div>
  );
}

export default LeadForm;