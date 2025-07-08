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
            <DialogTitle className="text-lg md:text-lg lg:text-lg tracking-tight text-gray-600 font-normal text-muted-foreground">
              Message us
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm md:text-sm lg:text-sm tracking-tighter text-gray-600 font-normal text-muted-foreground">
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
                      <FormLabel className="text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground">
                        Your Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground"
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
                      <FormLabel className="text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground"
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
                      <FormLabel className="text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground">
                        Phone Number{" "}
                        <span className="text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground">
                          (Optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground"
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
                      <FormLabel className="text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground">
                        Your Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="I'm interested in booking your property and have a few questions..."
                          className="text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Sending..." : "Message us"}
                </Button>
              </form>
            </Form>
            <p className="text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground">
              We typically respond to inquiries within an hour.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
