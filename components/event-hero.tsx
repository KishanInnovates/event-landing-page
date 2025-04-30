import { CalendarDays, MapPin, Clock } from "lucide-react"
import Image from "next/image"

export default function EventHero() {
  return (
    <div className="relative bg-gradient-to-b from-purple-900 to-purple-700 text-white">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/30 text-sm font-medium">
              Tech Workshop
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Software Development Engineering Tips & Tricks
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-purple-300" />
                <span>Saturday, June 15, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-300" />
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-300" />
                <span>Engineering Campus Auditorium</span>
              </div>
            </div>
            <div className="pt-4">
              <a
                href="#register"
                className="inline-flex h-12 items-center justify-center rounded-md bg-white px-6 font-medium text-purple-900 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                Register Now
              </a>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image src="/tech-conference-purple-poster.png" alt="Event Poster" fill className="object-cover" priority />
          </div>
        </div>
      </div>
    </div>
  )
}
