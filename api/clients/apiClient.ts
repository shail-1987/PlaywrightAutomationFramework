import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiClient {
    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }

    async get(url: string): Promise<APIResponse> {
        return await this.request.get(`${this.baseURL}${url}`);
    }

    async post(url: string, data?: unknown): Promise<APIResponse> {
        return await this.request.post(`${this.baseURL}${url}`, {
            data
        });
    }

    async put(url: string, data?: unknown): Promise<APIResponse> {
        return await this.request.put(`${this.baseURL}${url}`, {
            data
        });
    }

    async delete(url: string): Promise<APIResponse> {
        return await this.request.delete(`${this.baseURL}${url}`);
    }
}