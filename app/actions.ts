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
    console.log("Starting registration submission process...")

    // Validate environment variables
    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      throw new Error("GOOGLE_SHEETS_CLIENT_EMAIL environment variable is missing")
    }

    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      throw new Error("GOOGLE_SHEETS_PRIVATE_KEY environment variable is missing")
    }

    if (!process.env.GOOGLE_SHEETS_SHEET_ID) {
      throw new Error("GOOGLE_SHEETS_SHEET_ID environment variable is missing")
    }

    // Log the sheet ID (partially redacted for security)
    const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID
    const redactedSheetId = sheetId.substring(0, 5) + "..." + sheetId.substring(sheetId.length - 5)
    console.log(`Using Google Sheet ID: ${redactedSheetId}`)

    // Format the private key correctly
    // The private key from Google often contains escaped newlines that need to be converted
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n")

    console.log("Creating JWT client...")
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    console.log("Initializing Google Spreadsheet...")
    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth)

    console.log("Loading document info...")
    await doc.loadInfo()
    console.log(`Document title: "${doc.title}"`)

    // Check if the document has any sheets
    if (doc.sheetCount === 0) {
      throw new Error("The Google Sheet document doesn't contain any sheets")
    }

    console.log(`Document has ${doc.sheetCount} sheet(s)`)

    // Get the first sheet
    const sheet = doc.sheetsByIndex[0]
    console.log(`Using sheet: "${sheet.title}" (${sheet.rowCount} rows)`)

    // Check if the sheet has headers
    const rows = await sheet.getRows()
    if (rows.length === 0) {
      console.log("Sheet appears to be empty. Adding headers...")
      await sheet.setHeaderRow(["Name", "Email", "Contact", "College", "Branch", "Year", "RegistrationDate"])
      console.log("Headers added successfully")
    } else {
      console.log("Sheet already has data. Current headers:", sheet.headerValues)
    }

    // Add the new registration data
    console.log("Adding new registration data...")
    const newRow = {
      Name: data.name,
      Email: data.email,
      Contact: data.contact,
      College: data.college,
      Branch: data.branch,
      Year: data.year,
      RegistrationDate: new Date().toISOString(),
    }

    console.log("Row data:", JSON.stringify(newRow))
    await sheet.addRow(newRow)

    console.log("Registration data added successfully!")
    return { success: true }
  } catch (error) {
    console.error("Error in submitRegistration:", error)
    if (error instanceof Error) {
      throw new Error(`Registration failed: ${error.message}`)
    }
    throw new Error("Registration failed due to an unknown error")
  }
}
