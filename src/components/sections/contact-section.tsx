"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin,
  Clock,
  ExternalLink,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Film,
  MessageSquare,
} from "lucide-react";
import { sendInquiryAction } from "@/app/actions/send-inquiry";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(500, { message: "Message cannot exceed 500 characters." }),
});

type FormData = z.infer<typeof formSchema>;

const nearbyPlaces = [
  { name: "Eastwood City", distance: "0.1 km" },
  { name: "Bonifacio Global City", distance: "6 km" },
  { name: "Ortigas Center", distance: "3.8 km" },
  { name: "Makati", distance: "7 km" },
  { name: "Airport", distance: "12 km" },
];

const socialMediaLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61558711286570",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/kireihouse.ph",
    icon: Instagram,
  },
  { name: "WhatsApp", href: "https://wa.me/639175069965", icon: MessageSquare },
];

export function ContactSection() {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: FormData) {
    const result = await sendInquiryAction(values);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: result.message, // Use message from server action
        variant: "default",
      });
      form.reset();
    } else {
      toast({
        title: "Error Sending Message",
        description:
          result.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-4 overflow-x-hidden">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Property Location & Get in touch */}
          <div className="space-y-6">
            <h2 className="text-3xl font-normal">Property Location</h2>
            <p className="text-muted-foreground">
              Find us and explore the neighborhood
            </p>

            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d5199.74430346861!2d121.08133734244423!3d14.6075846246003!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssg!4v1749335816648!5m2!1sen!2ssg"
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
                aria-label="Property Location Map"
              ></iframe>
            </div>

            <div className="space-y-6">
              <div className="flex">
                <MapPin className="mr-4 h-5 w-5 text-accent mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold font-headline text-lg">
                    Address
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Palm Tree Avenue, Eastwood City, Libis, Quezon City 1800
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold font-headline text-lg flex items-center mb-3">
                  <Clock className="mr-3 h-5 w-5 text-accent" />
                  Nearby Places
                </h3>
                <ul className="space-y-1.5 text-sm">
                  {nearbyPlaces.map((place) => (
                    <li
                      key={place.name}
                      className="flex justify-between text-muted-foreground"
                    >
                      <span>{place.name}</span>
                      <span className="font-medium text-foreground/90">
                        {place.distance}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get in touch section */}
              <div className="pt-2">
                <h3 className="font-semibold font-headline text-lg mb-3">
                  Get in touch
                </h3>
                <div className="flex items-center space-x-3">
                  {socialMediaLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      target={link.name === "Facebook" ? "_blank" : undefined}
                      rel={
                        link.name === "Facebook"
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        aria-label={link.name}
                        className="text-accent hover:text-accent-foreground hover:bg-accent"
                      >
                        <link.icon className="h-6 w-6" />
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact the Host */}
          <div className="space-y-6">
            <Card className="shadow-xl h-full">
              <CardHeader>
                <CardTitle className="text-3xl font-normal">Contact</CardTitle>
                <CardDescription className="text-muted-foreground pt-1">
                  Interested to know more? Tell us what you think.
                </CardDescription>
                {/* {" Removed User card info "} */}
              </CardHeader>
              <CardContent className="pt-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
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
                          <FormLabel>
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
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="I'm interested in booking your property and have a few questions..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? "Sending..."
                        : "Send Inquiry"}
                    </Button>
                  </form>
                </Form>
                <p className="mt-6 text-xs text-muted-foreground text-center">
                  We typically respond to inquiries within an hour.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
