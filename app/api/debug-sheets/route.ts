import { NextResponse } from "next/server"
import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"

export async function GET() {
  try {
    // Validate environment variables
    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      return NextResponse.json({ error: "GOOGLE_SHEETS_CLIENT_EMAIL is missing" }, { status: 500 })
    }

    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      return NextResponse.json({ error: "GOOGLE_SHEETS_PRIVATE_KEY is missing" }, { status: 500 })
    }

    if (!process.env.GOOGLE_SHEETS_SHEET_ID) {
      return NextResponse.json({ error: "GOOGLE_SHEETS_SHEET_ID is missing" }, { status: 500 })
    }

    // Format the private key correctly
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n")

    // Create JWT client
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    // Initialize the sheet
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SHEET_ID, serviceAccountAuth)

    // Load the document info
    await doc.loadInfo()

    // Get information about the document and sheets
    const documentInfo = {
      title: doc.title,
      sheetCount: doc.sheetCount,
      sheets: doc.sheetsByIndex.map((sheet) => ({
        title: sheet.title,
        rowCount: sheet.rowCount,
        columnCount: sheet.columnCount,
      })),
    }

    // Try to get the first sheet's headers
    let headers = []
    if (doc.sheetCount > 0) {
      const firstSheet = doc.sheetsByIndex[0]
      await firstSheet.loadHeaderRow()
      headers = firstSheet.headerValues
    }

    // Return the debug information
    return NextResponse.json({
      success: true,
      message: "Google Sheets connection successful",
      documentInfo,
      headers,
      serviceAccount: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      // Redact most of the sheet ID for security
      sheetId:
        process.env.GOOGLE_SHEETS_SHEET_ID.substring(0, 5) +
        "..." +
        process.env.GOOGLE_SHEETS_SHEET_ID.substring(process.env.GOOGLE_SHEETS_SHEET_ID.length - 5),
    })
  } catch (error) {
    console.error("Error in debug-sheets API:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
