"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/app/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/card";
import { ContactFormData } from "@/lib/contact-form";

interface ContactHostFormProps {
  form: UseFormReturn<ContactFormData>;
  onSubmit: (data: ContactFormData) => Promise<void>;
  title?: string;
  subtitle?: string;
  footerText?: string;
}

export function ContactHostForm({
  form,
  onSubmit,
  title = "Interested to know more?",
  subtitle = "Let us know what you think.",
  footerText = "We typically respond to inquiries within an hour.",
}: ContactHostFormProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-xl h-full">
        <CardHeader>
          <CardTitle className="text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal">
            {title}
            <p className="text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal pt-1">
              {subtitle}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-sm lg:text-sm text-gray-600 tracking-tighter">
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        className="text-sm md:text-sm lg:text-sm text-gray-600 tracking-tighter"
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
                    <FormLabel className="text-sm md:text-sm text-gray-600 lg:text-sm tracking-tighter">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                        className="text-sm md:text-sm text-gray-600 lg:text-sm tracking-tighter"
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
                    <FormLabel className="text-sm md:text-sm text-gray-600 lg:text-sm tracking-tighter">
                      Phone Number{" "}
                      <span className="text-xs text-muted-foreground">
                        (Optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        {...field}
                        className="text-xs text-gray-600 text-muted-foreground tracking-tighter"
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
                    <FormLabel className="text-xs text-gray-600 text-muted-foreground tracking-tighter">
                      Your Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I'm interested in booking your property and have a few questions..."
                        className="min-h-[100px] text-xs text-gray-600 text-muted-foreground tracking-tighter"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full text-xs text-gray-600 text-muted-foreground tracking-tighter"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-xs text-muted-foreground text-center">
            {footerText}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
