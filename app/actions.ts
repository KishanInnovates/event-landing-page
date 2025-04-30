"use server"

import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"

type RegistrationData = {
  name: string
  email: string
  contact: string
  college: string
  branch: string
  year: string
}

export async function submitRegistration(data: RegistrationData) {
  try {
    // Create a JWT client using environment variables
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    // Initialize the sheet
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SHEET_ID as string, serviceAccountAuth)

    // Load the document info and sheets
    await doc.loadInfo()

    // Get the first sheet
    const sheet = doc.sheetsByIndex[0]

    // Add a row with the registration data
    await sheet.addRow({
      Name: data.name,
      Email: data.email,
      Contact: data.contact,
      College: data.college,
      Branch: data.branch,
      Year: data.year,
      RegistrationDate: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    console.error("Error submitting registration:", error)
    throw new Error("Failed to submit registration")
  }
}
