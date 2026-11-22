import React, { useState } from 'react';
import { Send, CheckCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Agent } from '@/types';

interface ContactAgentFormProps {
  agent: Agent;
  propertyTitle: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactAgentForm: React.FC<ContactAgentFormProps> = ({ agent, propertyTitle }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: `Hi ${agent.name}, I am interested in exploring "${propertyTitle}". Please contact me with private consultation details.`,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please provide a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 bg-[#1E3A5F]/10 dark:bg-[#CFC8BE]/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-7 h-7 text-[#1E3A5F] dark:text-[#CFC8BE]" />
        </div>
        <h3 className="text-lg font-bold text-[#1E3A5F] dark:text-white mb-1">
          Inquiry Successfully Dispatched
        </h3>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-5 max-w-sm mx-auto">
          Thank you for reaching out. {agent.name} has received your inquiry and will respond within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              message: `Hi ${agent.name}, I am interested in exploring "${propertyTitle}". Please contact me with private consultation details.`,
            });
          }}
          className="border-[#E5E7EB] dark:border-[#374151] text-[#1E3A5F] dark:text-[#CFC8BE] text-xs font-semibold"
        >
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-xs font-bold text-[#1E3A5F] dark:text-[#CFC8BE] flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" /> Full Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="e.g. Eleanor Vance"
          value={formData.name}
          onChange={handleChange}
          className={`h-10 text-xs bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#374151] rounded-xl text-[#374151] dark:text-white focus:ring-2 focus:ring-[#1E3A5F] ${
            errors.name ? 'border-red-500' : ''
          }`}
        />
        {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
      </div>

      {/* Email & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-bold text-[#1E3A5F] dark:text-[#CFC8BE] flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@domain.com"
            value={formData.email}
            onChange={handleChange}
            className={`h-10 text-xs bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#374151] rounded-xl text-[#374151] dark:text-white focus:ring-2 focus:ring-[#1E3A5F] ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-bold text-[#1E3A5F] dark:text-[#CFC8BE] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
            className={`h-10 text-xs bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#374151] rounded-xl text-[#374151] dark:text-white focus:ring-2 focus:ring-[#1E3A5F] ${
              errors.phone ? 'border-red-500' : ''
            }`}
          />
          {errors.phone && <p className="text-[11px] text-red-500">{errors.phone}</p>}
        </div>
      </div>

      {/* Message Field */}
      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-xs font-bold text-[#1E3A5F] dark:text-[#CFC8BE] flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" /> Message or Inquiry
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className={`text-xs bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#374151] rounded-xl text-[#374151] dark:text-white focus:ring-2 focus:ring-[#1E3A5F] ${
            errors.message ? 'border-red-500' : ''
          }`}
        />
        {errors.message && <p className="text-[11px] text-red-500">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 bg-[#1E3A5F] hover:bg-[#162C49] text-white dark:bg-[#CFC8BE] dark:text-[#1E3A5F] dark:hover:bg-white font-semibold rounded-xl transition-all shadow-md"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Dispatching Message...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-3.5 h-3.5" />
            Send Confidential Inquiry
          </span>
        )}
      </Button>
    </form>
  );
};

export default ContactAgentForm;
