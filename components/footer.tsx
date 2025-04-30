import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">SDE Tips & Tricks</h3>
            <p className="mb-4">
              Join us for an immersive workshop on software development best practices and career advancement
              strategies.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-purple-400" />
                <span>event@sdetips.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-purple-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-purple-400" />
                <span>Engineering Campus Auditorium, Tech University</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white hover:underline">
                  About the Organizers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white hover:underline">
                  Past Events
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white hover:underline">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} SDE Tips & Tricks Workshop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
