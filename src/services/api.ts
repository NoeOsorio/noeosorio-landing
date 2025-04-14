interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  experience?: string;
  mentorshipType?: string;
  availability?: string;
  position?: string;
  linkedin?: string;
}

interface LeadFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  campaignId: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al enviar el formulario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en submitContactForm:', error);
    throw error;
  }
};

export async function submitLeadForm(data: LeadFormData): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    console.error('Error submitting lead form:', error);
    throw error;
  }
} 