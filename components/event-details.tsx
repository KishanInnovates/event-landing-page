import { Users, Award, Coffee } from "lucide-react"

export default function EventDetails() {
  return (
    <section className="py-12 border-t border-b">
      <h2 className="text-3xl font-bold mb-8">Event Details</h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-purple-50 p-6 rounded-lg">
          <Users className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Who Should Attend</h3>
          <ul className="space-y-2">
            <li>Computer Science students</li>
            <li>Engineering students</li>
            <li>Early-career developers</li>
            <li>Tech enthusiasts</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <Award className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">What's Included</h3>
          <ul className="space-y-2">
            <li>Full-day workshop access</li>
            <li>Hands-on coding sessions</li>
            <li>Networking opportunities</li>
            <li>Certificate of participation</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <Coffee className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Schedule</h3>
          <ul className="space-y-2">
            <li>10:00 AM - Registration</li>
            <li>10:30 AM - Opening keynote</li>
            <li>12:00 PM - Lunch break</li>
            <li>1:00 PM - Workshops</li>
            <li>4:00 PM - Closing & networking</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
