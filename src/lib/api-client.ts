type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export class ApiClient {
  private isRefreshing = false;
  private refreshPromise: Promise<string | null> | null = null;

  constructor(private readonly baseURL: string) {}

  // Access token
  private get accessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  private set accessToken(token: string | null) {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }

  // Headers base
  private buildHeaders(extra?: HeadersInit): HeadersInit {
    return {
      "Content-Type": "application/json",
      ...(this.accessToken && {
        Authorization: `Bearer ${this.accessToken}`,
      }),
      ...extra,
    };
  }

  // Refresh token (cookie HttpOnly)
  private async refreshAccessToken(): Promise<string | null> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;

    this.refreshPromise = fetch(`${this.baseURL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) return null;

        const { accessToken } = await res.json();
        this.accessToken = accessToken;
        return accessToken;
      })
      .catch(() => null)
      .finally(() => {
        this.isRefreshing = false;
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }

  // Logout centralizado
  private forceLogout(): never {
    this.accessToken = null;
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  // Manejo de respuestas
  private async handleResponse<T>(
    res: Response,
    retry: () => Promise<Response>,
  ): Promise<T> {
    if (res.status === 401) {
      const newToken = await this.refreshAccessToken();

      if (!newToken) {
        this.forceLogout();
      }

      const retryRes = await retry();
      return this.handleResponse<T>(retryRes, retry);
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.message || `Error ${res.status}`);
    }

    return res.json();
  }

  // Request genérico
  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    body?: unknown,
  ): Promise<T> {
    const execute = () => {
      const options: RequestInit = {
        method,
        headers: this.buildHeaders(),
        credentials: "include",
      };

      if (body !== undefined) {
        options.body = JSON.stringify(body);
      }

      return fetch(`${this.baseURL}${endpoint}`, options);
    };

    const res = await execute();
    return this.handleResponse<T>(res, execute);
  }

  // API pública
  get<T>(endpoint: string) {
    return this.request<T>("GET", endpoint);
  }

  post<T>(endpoint: string, data: unknown) {
    return this.request<T>("POST", endpoint, data);
  }

  patch<T>(endpoint: string, data: unknown) {
    return this.request<T>("PATCH", endpoint, data);
  }

  delete(endpoint: string) {
    return this.request<void>("DELETE", endpoint);
  }
}

export const apiClient = new ApiClient(
  "https://mad-leigh-york-company-fd0936f6.koyeb.app/",
);
