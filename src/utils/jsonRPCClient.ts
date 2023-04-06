interface JSONRPCRequest {
  jsonrpc: string
  method: string
  params: any
  id: number
}

interface JSONRPCResponse {
  jsonrpc: string
  result?: any
  error?: {
    code: number
    message: string
    data?: any
  }
  id: number
}

class JSONRPCClient {
  private requestId = 1

  constructor(private endpoint: string, private apiKey: string) {}

  sendRequest(method: string, params?: any): Promise<any> {
    params = params || {}
    const request: JSONRPCRequest = {
      jsonrpc: "2.0",
      method: method,
      params: { apikey: this.apiKey, ...params },
      id: this.requestId++,
    }
    return fetch(this.endpoint, {
      method: "POST",
      body: JSON.stringify(request),
    }).then((response) => {
      if (response.status === 200) {
        // Use client.receive when you received a JSON-RPC response.
        return response.json().then((jsonRPCResponse) => jsonRPCResponse.result)
      } else if (request.id !== undefined) {
        return Promise.reject(new Error(response.statusText))
      }
    })
  }
}

export default JSONRPCClient
