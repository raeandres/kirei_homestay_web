"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, MessageSquare } from "lucide-react";
import {
  contactFormSchema,
  ContactFormData,
  createContactFormHandler,
} from "@/lib/contact-form";
import { PropertyLocation } from "@/app/sections/components/property-location/property-location";
import { ContactHostForm } from "@/app/sections/components/contact-host-form";

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
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Use the externalized contact form handler
  const onSubmit = createContactFormHandler(toast, () => form.reset());

  return (
    <section id="contact" className="py-8 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-lg md:text-xl text-left px-4 font-headline mb-2">
          LOCATE US
        </h2>
        <p className="text-sm px-4 text-left mb-4">
          Find us and explore the neighborhood
        </p>
        <div className="container max-w-6xl mx-auto px-4 overflow-x-hidden">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: Property Location & Get in touch */}
            <PropertyLocation
              mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d5199.74430346861!2d121.08133734244423!3d14.6075846246003!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssg!4v1749335816648!5m2!1sen!2ssg"
              address="Palm Tree Avenue, Eastwood City, Libis, Quezon City 1800"
              nearbyPlaces={nearbyPlaces}
              socialMediaLinks={socialMediaLinks}
            />

            {/* Right Column: Contact the Host */}
            <ContactHostForm form={form} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
}
