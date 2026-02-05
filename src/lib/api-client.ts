export class ApiClient {
  private baseURL: string;
  private isRefreshing = false;
  private refreshPromise: Promise<void> | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Access token (solo frontend)
  private getToken(): string | null {
    return localStorage.getItem("access_token");
  }

  private setToken(token: string) {
    localStorage.setItem("access_token", token);
  }

  private clearToken() {
    localStorage.removeItem("access_token");
  }

  // Headers automáticos
  private getHeaders(extra: HeadersInit = {}): HeadersInit {
    const token = this.getToken();

    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...extra,
    };
  }

  // REFRESH TOKEN (cookie httpOnly)
  private async refreshToken(): Promise<void> {
    if (this.isRefreshing) {
      return this.refreshPromise!;
    }

    this.isRefreshing = true;

    this.refreshPromise = fetch(`${this.baseURL}/auth/refresh`, {
      method: "POST",
      credentials: "include", // cookie
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Refresh failed");

        const data = await res.json();
        this.setToken(data.accessToken);
      })
      .catch(() => {
        this.clearToken();
        window.location.href = "/login";
        throw new Error("Session expired");
      })
      .finally(() => {
        this.isRefreshing = false;
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }

  private async handleResponse<T>(
    res: Response,
    retry: () => Promise<T>,
  ): Promise<T> {
    if (res.status === 401) {
      await this.refreshToken();
      return retry(); // reintenta
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.message || `Error ${res.status}`);
    }

    return res.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const retry = () => this.get<T>(endpoint);

    const res = await fetch(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(res, retry);
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const retry = () => this.post<T>(endpoint, data);

    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(res, retry);
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    const retry = () => this.patch<T>(endpoint, data);

    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(res, retry);
  }

  async delete(endpoint: string): Promise<void> {
    const retry = () => this.delete(endpoint);

    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (res.status === 401) {
      await this.refreshToken();
      return retry();
    }

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }
  }
}

export const apiClient = new ApiClient(
  "https://gym-combarranquilla-api.leapcell.app",
);
