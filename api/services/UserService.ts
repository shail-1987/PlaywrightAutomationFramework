import { APIRequestContext } from "@playwright/test";
import { ApiClient } from "../clients/apiClient";
import { CURRENT_ENV } from "../../config/environment";
import { UserEndpoints } from "../endpoints/UserEndpoints";

export class UserService {

    private apiClient: ApiClient;

    constructor(request: APIRequestContext) {
        this.apiClient = new ApiClient(
            request,
            CURRENT_ENV.baseURL
        );
    }

    // GET ALL USERS
    async getUsers() {
        return await this.apiClient.get(
            UserEndpoints.GET_USERS
        );
    }

    // GET SINGLE USER
    async getSingleUser(id: number) {
        return await this.apiClient.get(
            `${UserEndpoints.GET_SINGLE_USER}/${id}`
        );
    }

    // CREATE USER
    async createUser(payload: any) {
        return await this.apiClient.post(
            UserEndpoints.CREATE_USER,
            payload
        );
    }

    // UPDATE USER
    async updateUser(id: number, payload: any) {
        return await this.apiClient.put(
            `${UserEndpoints.UPDATE_USER}/${id}`,
            payload
        );
    }

    // DELETE USER
    async deleteUser(id: number) {
        return await this.apiClient.delete(
            `${UserEndpoints.DELETE_USER}/${id}`
        );
    }
}