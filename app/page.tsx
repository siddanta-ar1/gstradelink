import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* Placeholder for the next section */}
      <section className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-brand-primary mb-4">
            Our Product Categories
          </h2>
          <p className="text-brand-muted">Coming soon in the next step...</p>
        </div>
      </section>
    </main>
  );
}
