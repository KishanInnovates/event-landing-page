"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function DebugButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

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

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
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
