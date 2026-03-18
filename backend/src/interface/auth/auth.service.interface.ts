import { LoginDataType } from "@/schema/auth/auth.login.schema";
import { UserResponseType } from "@/schema/user/user.response.schema";

export interface IAuthService {
    login: (payload: LoginDataType) => Promise<{ accessToken: string }>;
    getUser: (userId: string) => Promise<UserResponseType>;
}
