export function handleError(error: any, method: string, url: string): never {
    const status = error.response?.status;
    const statusText = error.response?.statusText;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;
  
    console.error(`[API ERROR] ${method.toUpperCase()} ${url}`);
    console.error(`→ Status: ${status || 'Unknown'} ${statusText || ''}`);
    console.error(`→ Message: ${message}`);
  
    throw error;
  }
  