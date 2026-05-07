import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useLogin } from "../hooks/auth/auth.login.hook";

// Define these outside the component to keep them organized
const DEMO_CREDENTIALS = {
    email: "sarathvp1546@gmail.com",
    password: "Sarath@2308",
};

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const loginMutation = useLogin();

    const validate = (name: string, value: string): boolean => {
        let error = "";
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) error = "Email is required";
            else if (!emailRegex.test(value)) error = "Enter a valid email address";
        }
        if (name === "password") {
            if (!value) error = "Password is required";
            else if (value.length < 6) error = "Password must be at least 6 characters";
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
        return error === "";
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const isEmailValid = validate("email", formData.email);
        const isPassValid = validate("password", formData.password);

        if (!isEmailValid || !isPassValid) return;

        try {
            await loginMutation.mutateAsync(formData);
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    const handleDemoLogin = async () => {
        // Silently fill and submit without user input
        setErrors({});
        try {
            await loginMutation.mutateAsync(DEMO_CREDENTIALS);
        } catch (err) {
            console.error("Demo login failed:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
            <div className="w-full max-w-md p-8 bg-[#141414] border border-zinc-800 rounded-2xl shadow-2xl">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white">Welcome back</h2>
                    <p className="text-zinc-400 mt-2">Enter your credentials to access your account.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={(e) => validate(e.target.name, e.target.value)}
                            className={`w-full px-4 py-3 bg-[#1c1c1c] border rounded-lg outline-none transition-all text-white ${
                                errors.email ? "border-red-500 ring-1 ring-red-500" : "border-zinc-800 focus:border-blue-500"
                            }`}
                            placeholder="name@company.com"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={(e) => validate(e.target.name, e.target.value)}
                            className={`w-full px-4 py-3 bg-[#1c1c1c] border rounded-lg outline-none transition-all text-white ${
                                errors.password ? "border-red-500 ring-1 ring-red-500" : "border-zinc-800 focus:border-blue-500"
                            }`}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                    </div>

                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full py-3 px-4 bg-white hover:bg-zinc-200 text-black font-semibold rounded-lg transition-colors disabled:opacity-50"
                        >
                            {loginMutation.isPending ? "Authenticating..." : "Sign In"}
                        </button>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-zinc-800"></div>
                            <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase tracking-widest">Or</span>
                            <div className="flex-grow border-t border-zinc-800"></div>
                        </div>

                        <button
                            type="button"
                            onClick={handleDemoLogin}
                            disabled={loginMutation.isPending}
                            className="w-full py-3 px-4 bg-[#1c1c1c] hover:bg-zinc-800 text-zinc-300 border border-zinc-700 font-medium rounded-lg transition-all"
                        >
                            Quick Demo Access
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;