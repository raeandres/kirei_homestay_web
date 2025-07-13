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
import { useDevice } from "@/hooks/use-device";

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

  const { isMobile } = useDevice();

  return (
    <section id="contact" className="py-8 md:py-24 bg-background">
      <div className="container max-w-6xl 2k:max-w-full 4k:max-w-full mx-auto px-4 2k:px-16 4k:px-24">
        <h2
          className={
            isMobile
              ? "text-lg md:text-xl text-left  font-headline tracking-wide"
              : "text-lg md:text-xl text-left text-justify-center font-headline tracking-wide xl:text-2xl 2k:text-4xl 4k:text-4xl"
          }
        >
          LOCATE US
        </h2>
        <h3
          className={
            isMobile
              ? "text-sm text-left font-headlline tracking-tighter mb-2"
              : "text-sm xl:text-lg 2k:text-xl 4k:text-xlmd:text-xl text-left text-justify-left font-headline mb-2 tracking-tighter "
          }
        >
          Find us and explore the neighborhood
        </h3>
        <div className="ccontainer max-w-6xl 2k:max-w-full 4k:max-w-full mx-auto overflow-x-hidden">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: Property Location & Get in touch */}
            <PropertyLocation
              mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.2719348889746!2d121.07763483908126!3d14.60976159571077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b81d78e5cc63%3A0xbd6fcecf7127264c!2sEastwood%20City!5e1!3m2!1sen!2sph!4v1752381686394!5m2!1sen!2sph"
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
