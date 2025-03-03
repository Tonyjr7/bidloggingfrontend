export function getApiUrl(path: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://todoapi-9e6k.onrender.com"
    return `${baseUrl}${path}`
  }
  
  
