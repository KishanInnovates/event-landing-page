"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function DebugButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showEnvHelp, setShowEnvHelp] = useState(false)

  const handleDebug = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/debug-sheets")
      const data = await response.json()

      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || "Unknown error occurred")
      }
    } catch (err) {
      setError("Failed to run debug check")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-8 p-4 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Google Sheets Debug Tool</h3>
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleDebug} disabled={isLoading} variant="outline">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Check Google Sheets Connection"
          )}
        </Button>
        <Button onClick={() => setShowEnvHelp(!showEnvHelp)} variant="ghost">
          {showEnvHelp ? "Hide Help" : "Show Help"}
        </Button>
      </div>

      {showEnvHelp && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <h4 className="font-semibold text-blue-800 mb-2">How to Fix Google Sheets Connection</h4>
          <ol className="list-decimal list-inside space-y-2 text-blue-900">
            <li>
              <strong>Verify Sheet ID:</strong> Open your Google Sheet and copy the ID from the URL (between /d/ and
              /edit)
            </li>
            <li>
              <strong>Share the Sheet:</strong> Click "Share" in Google Sheets and add your service account email with
              "Editor" access
            </li>
            <li>
              <strong>Check Environment Variables:</strong> Make sure all three environment variables are set correctly
              in Vercel
            </li>
            <li>
              <strong>Enable API:</strong> Make sure the Google Sheets API is enabled in your Google Cloud project
            </li>
          </ol>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
          {error.includes("404") && (
            <div className="mt-2 p-2 bg-red-100 rounded">
              <p className="font-semibold">This error typically means:</p>
              <ul className="list-disc list-inside mt-1">
                <li>The Google Sheet ID is incorrect, or</li>
                <li>The service account doesn't have access to the sheet</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="font-semibold text-green-700">Connection successful!</p>
          <div className="mt-2 space-y-2">
            <p>
              <span className="font-medium">Document title:</span> {result.documentInfo.title}
            </p>
            <p>
              <span className="font-medium">Sheet count:</span> {result.documentInfo.sheetCount}
            </p>
            <p>
              <span className="font-medium">Service account:</span> {result.serviceAccount}
            </p>
            <p>
              <span className="font-medium">Sheet ID:</span> {result.sheetId}
            </p>

            {result.documentInfo.sheets.length > 0 && (
              <div>
                <p className="font-medium">First sheet:</p>
                <ul className="list-disc list-inside pl-4">
                  <li>Title: {result.documentInfo.sheets[0].title}</li>
                  <li>Rows: {result.documentInfo.sheets[0].rowCount}</li>
                  <li>Columns: {result.documentInfo.sheets[0].columnCount}</li>
                </ul>
              </div>
            )}

            {result.headers && result.headers.length > 0 && (
              <div>
                <p className="font-medium">Headers:</p>
                <ul className="list-disc list-inside pl-4">
                  {result.headers.map((header: string, index: number) => (
                    <li key={index}>{header}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
