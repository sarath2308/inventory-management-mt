export interface IPasswordService {
    hashPassword(password: string): Promise<string>;
    comparePassword: (hash: string, password: string) => Promise<boolean>;
}
