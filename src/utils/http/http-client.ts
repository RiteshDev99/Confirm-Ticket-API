import {CookieJar} from "./cookie-jar.ts";

export function createHttpClient(): HttpClient {
    return new HttpClient();
}

interface JsonBody {
    [key: string]: unknown;
}

class HttpClient {
    private cookieJar: CookieJar;

    constructor(cookieJar?: CookieJar) {
        this.cookieJar = cookieJar || new CookieJar();
    }

    async request(url: string, options: RequestInit = {}, customHeaders?: Record<string, string>): Promise<Response> {
        const headers = new Headers(options.headers);

        if (customHeaders) {
            Object.entries(customHeaders).forEach(([key, value]) => {
                headers.set(key, value);
            });
        }

        const cookieHeader = this.cookieJar.getCookieHeader();
        if (cookieHeader) {
            headers.set("Cookie", cookieHeader);
        }

        const res = await fetch(url, { ...options, headers });

        const setCookie = res.headers.get("Set-Cookie");
        if (setCookie) this.cookieJar.setCookies(setCookie);

        return res;
    }

    async get(url: string, headers?: Record<string, string>): Promise<Response> {
        return this.request(url, { method: "GET" }, headers);
    }

    async post(url: string, body: JsonBody, headers?: Record<string, string>): Promise<Response> {
        return this.request(
            url,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            },
            headers
        );
    }

    async submitForm(url: string, formData: Record<string, string>, headers?: Record<string, string>): Promise<Response> {
        const body = new URLSearchParams(formData).toString();
        return this.request(
            url,
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body,
            },
            headers
        );
    }
}
