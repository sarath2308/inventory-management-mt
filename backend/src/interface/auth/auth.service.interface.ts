import { LoginDataType } from "@/schema/auth/auth.login.schema";

export interface IAuthService {
    login: (payload: LoginDataType) => Promise<{ accessToken: string }>;
}
