import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact",
  description:
    "Contact GSTradeLink for product enquiries, weighing machine service, and spare parts support in Chitwan.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background-secondary py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="bg-white border border-border-primary rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm motion-safe:animate-fade-up">
          <span className="inline-flex px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-100 rounded-full mb-3">
            Contact GSTradeLink
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground-primary tracking-tight">
            Get product pricing and support quickly
          </h1>
          <p className="mt-3 text-sm sm:text-base text-foreground-secondary max-w-2xl leading-relaxed">
            Tell us your weighing requirement and our team will suggest the right
            product, calibration, or repair plan.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/9779765662427"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:brightness-110 transition"
            >
              <MessageCircle size={17} fill="white" /> Chat on WhatsApp
            </a>
            <a
              href="tel:+9779765662427"
              className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-full border border-primary-600 text-primary-700 text-sm font-semibold hover:bg-primary-50 transition"
            >
              <Phone size={16} /> Call now
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-full border border-border-primary text-foreground-primary text-sm font-semibold hover:bg-background-secondary transition"
            >
              Browse catalogue
            </Link>
          </div>
        </section>

        <section className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 motion-safe:animate-fade-up">
          <div className="bg-white border border-border-primary rounded-2xl p-4">
            <MapPin size={18} className="text-primary-600 mb-2" />
            <h2 className="font-semibold text-foreground-primary text-sm">Store Location</h2>
            <p className="text-xs text-foreground-secondary mt-1">
              Bharatpur-10, Chitwan, Nepal
            </p>
          </div>

          <div className="bg-white border border-border-primary rounded-2xl p-4">
            <Phone size={18} className="text-primary-600 mb-2" />
            <h2 className="font-semibold text-foreground-primary text-sm">Phone</h2>
            <a href="tel:+9779765662427" className="text-xs text-foreground-secondary mt-1 block hover:text-primary-700">
              +977 9765662427
            </a>
          </div>

          <div className="bg-white border border-border-primary rounded-2xl p-4">
            <Mail size={18} className="text-primary-600 mb-2" />
            <h2 className="font-semibold text-foreground-primary text-sm">Email</h2>
            <p className="text-xs text-foreground-secondary mt-1">contact@gstradelink.com</p>
          </div>

          <div className="bg-white border border-border-primary rounded-2xl p-4">
            <Clock3 size={18} className="text-primary-600 mb-2" />
            <h2 className="font-semibold text-foreground-primary text-sm">Working Hours</h2>
            <p className="text-xs text-foreground-secondary mt-1">Mon–Sat, 10:00 AM – 6:00 PM</p>
          </div>
        </section>
      </div>
    </div>
  );
}
