import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    console.log("Registration data received:", data)

    // Here you could implement an alternative storage solution
    // For example, sending the data to your email or storing in a database

    // For now, let's just log it and return success
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in registration API:", error)
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 })
  }
}
