import EventHero from "@/components/event-hero"
import EventDescription from "@/components/event-description"
import RegistrationForm from "@/components/registration-form"
import EventDetails from "@/components/event-details"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <EventHero />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <EventDescription />
        <EventDetails />
        <RegistrationForm />
      </div>
      <Footer />
    </main>
  )
}
