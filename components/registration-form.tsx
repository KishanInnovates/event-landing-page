"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitRegistration } from "@/app/actions"
import { Loader2, CheckCircle } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  contact: z.string().min(10, { message: "Please enter a valid contact number" }),
  college: z.string().min(2, { message: "College name is required" }),
  branch: z.string().min(2, { message: "Branch is required" }),
  year: z.string().min(1, { message: "Year is required" }),
})

type FormValues = z.infer<typeof formSchema>

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [yearValue, setYearValue] = useState<string>("")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      college: "",
      branch: "",
      year: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      await submitRegistration(data)
      setIsSuccess(true)
      reset()
      setYearValue("")
    } catch (err) {
      setError("Failed to submit registration. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="register" className="py-12">
      <h2 className="text-3xl font-bold mb-6">Register for the Event</h2>

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-center gap-4">
          <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-800">Registration Successful!</h3>
            <p className="text-green-700">Thank you for registering. We've sent the event details to your email.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input id="contact" {...register("contact")} />
              {errors.contact && <p className="text-sm text-red-500">{errors.contact.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="college">College/University</Label>
              <Input id="college" {...register("college")} />
              {errors.college && <p className="text-sm text-red-500">{errors.college.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch">Branch/Major</Label>
              <Input id="branch" {...register("branch")} />
              {errors.branch && <p className="text-sm text-red-500">{errors.branch.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year of Study</Label>
              <Select
                value={yearValue}
                onValueChange={(value) => {
                  setYearValue(value)
                  setValue("year", value, { shouldValidate: true })
                }}
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">First Year</SelectItem>
                  <SelectItem value="2">Second Year</SelectItem>
                  <SelectItem value="3">Third Year</SelectItem>
                  <SelectItem value="4">Fourth Year</SelectItem>
                  <SelectItem value="5+">Fifth Year or higher</SelectItem>
                </SelectContent>
              </Select>
              {errors.year && <p className="text-sm text-red-500">{errors.year.message}</p>}
            </div>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{error}</div>}

          <Button type="submit" className="w-full md:w-auto bg-purple-700 hover:bg-purple-800" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Register Now"
            )}
          </Button>
        </form>
      )}
    </section>
  )
}
