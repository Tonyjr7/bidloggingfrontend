export function getApiUrl(path: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://bidloggingapi.onrender.com"
    return `${baseUrl}${path}`
  }
  
  
