"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Send, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "Order Enquiry",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.gravitatee.com'}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      
      if (!res.ok) throw new Error('Failed to send message');
      
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 h-full relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="mb-10 relative z-10">
        <h3 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-3 tracking-tight">Send us a Message</h3>
        <p className="text-gray-500 font-sans text-base">We usually reply within a few hours. Let's talk about your needs.</p>
      </div>

      {isSuccess ? (
        <div className="bg-green-50/80 text-green-900 p-8 rounded-3xl border border-green-100 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
             <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="font-display font-bold text-2xl mb-2">Message Sent Successfully!</h4>
          <p className="text-green-700/80 text-sm">Thank you for reaching out. Our team will get back to you shortly.</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold text-sm">Full Name <span className="text-brand-red">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="bg-gray-50/50 border-gray-200 h-12 rounded-xl focus-visible:ring-brand-orange/20 focus-visible:border-brand-orange transition-all px-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold text-sm">Phone Number <span className="text-brand-red">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="+91 9876543210" {...field} className="bg-gray-50/50 border-gray-200 h-12 rounded-xl focus-visible:ring-brand-orange/20 focus-visible:border-brand-orange transition-all px-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold text-sm">Email Address <span className="text-gray-400 font-normal">(Optional)</span></FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} className="bg-gray-50/50 border-gray-200 h-12 rounded-xl focus-visible:ring-brand-orange/20 focus-visible:border-brand-orange transition-all px-4" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold text-sm">Subject <span className="text-brand-red">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <select 
                        {...field} 
                        className="flex h-12 w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all cursor-pointer"
                      >
                        <option value="Order Enquiry">Order Enquiry</option>
                        <option value="Wholesale">Wholesale / Distributorship</option>
                        <option value="Feedback">Feedback / Suggestions</option>
                        <option value="Other">Other Query</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold text-sm">Message <span className="text-brand-red">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="How can we help you today?" 
                      className="resize-none bg-gray-50/50 border-gray-200 min-h-[140px] rounded-xl focus-visible:ring-brand-orange/20 focus-visible:border-brand-orange transition-all p-4" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-orange hover:bg-orange-600 text-white rounded-xl h-14 text-base font-bold transition-all duration-300 shadow-[0_8px_20px_rgb(238,114,20,0.25)] hover:shadow-[0_12px_25px_rgb(238,114,20,0.35)] hover:-translate-y-0.5 group flex gap-2 items-center justify-center mt-4">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
