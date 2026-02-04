export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  }

  // 🔥 DELETE SIN response.json()
  async delete(endpoint: string): Promise<void> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // ⚠️ NO intentar response.json()
    return;
  }
}

export const apiClient = new ApiClient(
  "https://gym-combarranquilla-api.leapcell.app",
);
