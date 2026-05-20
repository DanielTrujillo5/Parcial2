import { http } from "./http";
import type { ApiResponse } from "../types/api";
import type { JwtResponse, LoginRequest } from "../types/auth";

export const authApi = {
  login: (data: LoginRequest) =>
    http<ApiResponse<JwtResponse>>(
      "/auth/login",
      "POST",
      data
    ),
};