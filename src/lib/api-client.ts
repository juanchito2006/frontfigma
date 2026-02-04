export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // 🔐 Obtiene JWT
  private getToken(): string | null {
    return localStorage.getItem("access_token");
  }

  // 🧠 Headers con Authorization automático
  private getHeaders(extraHeaders: HeadersInit = {}): HeadersInit {
    const token = this.getToken();

    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...extraHeaders,
    };
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    // Token inválido / expirado
    if (res.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.message || `Error ${res.status}`);
    }

    return res.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(res);
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(res);
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(res);
  }

  // 🔥 DELETE sin body
  async delete(endpoint: string): Promise<void> {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
      return;
    }

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
  }
}

export const apiClient = new ApiClient(
  "https://gym-combarranquilla-api.leapcell.app",
);
