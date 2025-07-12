"use client";

import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";
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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Don't render form until hydrated to prevent Chrome autofill hydration issues
  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <Card className="shadow-xl h-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-lg lg:text-lg tracking-tight text-gray-600 font-normal text-muted-foreground">
              {title}
              <p className="text-xs md:text-sm lg:text-sm tracking-tighter text-gray-600 font-normal text-muted-foreground">
                {subtitle}
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="h-20 bg-gray-100 rounded-md animate-pulse"></div>
              <div className="h-20 bg-gray-100 rounded-md animate-pulse"></div>
              <div className="h-20 bg-gray-100 rounded-md animate-pulse"></div>
              <div className="h-32 bg-gray-100 rounded-md animate-pulse"></div>
              <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className=" h-full rounded-none">
        <CardHeader>
          <CardTitle className="text-lg md:text-lg lg:text-lg tracking-tight text-gray-600 font-normal text-muted-foreground">
            {title}
            <p className="text-xs md:text-sm lg:text-sm tracking-tighter text-gray-600 font-normal text-muted-foreground">
              {subtitle}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2"
              autoComplete="off"
              noValidate
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground">
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        className="text-xs md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground"
                        autoComplete="off"
                        data-form-type="other"
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
                    <FormLabel className="text-xs md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                        className="text-xs md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground"
                        autoComplete="off"
                        data-form-type="other"
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
                    <FormLabel className="text-xs md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground">
                      Phone Number{" "}
                      <span className="text-xs md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground">
                        (Optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        {...field}
                        className="text-xs md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foreground"
                        autoComplete="off"
                        data-form-type="other"
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
                    <FormLabel className="text-xs md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal text-muted-foregroundr">
                      Your Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I'm interested in booking your property and have a few questions..."
                        className="text-xs md:text-sm lg:text-xs tracking-tight text-gray-600 font-normal text-muted-foreground"
                        {...field}
                        autoComplete="off"
                        data-form-type="other"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full text-sm md:text-sm lg:text-sm tracking-tight text-gray-600 font-medium text-muted-foreground"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Sending..." : "Message us"}
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
