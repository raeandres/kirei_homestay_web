"use client";

import { UseFormReturn } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { Textarea } from "@/app/ui/textarea";
import { Button } from "@/app/ui/button";
import { ContactFormData } from "@/lib/contact-form";

interface ContactHostModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<ContactFormData>;
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export function ContactHostModal({
  isOpen,
  onOpenChange,
  form,
  onSubmit,
}: ContactHostModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto safe-area-modal">
        <div className="p-6 pt-8 pb-8">
          <DialogHeader>
            <DialogTitle className="text-3xl tracking-tight text-stormy-blue/60 font-normal font-playfair-display">
              Message us
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-lg tracking-tighter text-stormy-blue/60 font-tight font-playfair-display">
              Interested to know more? Let us know what you think.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg tracking-tighter text-stormy-blue/60 font-playfair-display">
                        Your Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-lg tracking-tighter text-stormy-blue/60 font-playfair-display"
                          placeholder="Your Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg tracking-tighter text-stormy-blue/60 font-playfair-display">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-lg tracking-tighter text-stormy-blue/60 font-playfair-display"
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
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
                      <FormLabel className="text-lg tracking-tighter text-stormy-blue/60 font-playfair-display">
                        Phone Number{" "}
                        <span className="text-lg tracking-tighter text-stormy-blue/60 font-playfair-display">
                          (Optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-lg tracking-tighter text-stormy-blue/60 font-playfair-display"
                          type="tel"
                          placeholder="(555) 123-4567"
                          {...field}
                        />
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
                      <FormLabel className="text-lg tracking-tighter text-stormy-blue/60 font-playfair-display">
                        Your Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="I'm interested in booking your property and have a few questions..."
                          className="text-lg tracking-tighter text-stormy-blue/60 font-playfair-display"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full text-lg md:text-sm lg:text-sm 2k:text-lg 4k:text-lg bg-stormy-blue tracking-tighter font-playfair-display hover:text-white text-white font-medium rounded-none"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Sending..." : "Message us"}
                </Button>
              </form>
            </Form>
            <p className="mt-6 text-base md:text-sm lg:text-sm 2k:text-base 4k:text-lg tracking-tighter text-center font-playfair-display text-stormy-blue/60">
              We typically respond to inquiries within an hour.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
