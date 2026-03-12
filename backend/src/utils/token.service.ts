import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { injectable } from "inversify";

dotenv.config();

type Tpayload = { userId: string; type?: string };

export interface ITokenService {
  signAccessToken(payload: Tpayload, expiresIn?: string): Promise<string>;
  verifyAccessToken(token: string): JwtPayload | null;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITempTokenRes {
  success: boolean;
  message: string;
  data: Tpayload;
}

@injectable()
export class TokenService implements ITokenService {

  // ---------------- ACCESS TOKEN ----------------
  async signAccessToken(payload: Tpayload): Promise<string> {
    const options: SignOptions = {
      expiresIn: "15m",
    };

    return jwt.sign(
      { ...payload },
      process.env.ACCESS_TOKEN_SECRET!,
      options,
    );
  }

  // ---------------- VERIFY ACCESS ----------------
  verifyAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
    } catch {
      return null;
    }
  }

}