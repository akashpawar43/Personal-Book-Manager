"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "@/redux/auth/auth.actions";
import { loginSchema } from "@/validations/auth.schema";
import { flattenError } from "zod/v4/core";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const { token } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (token) {
      router.push("/books");
    }
  }, [token, router]);

  const submit = () => {

    const result = loginSchema.safeParse({
      email,
      password
    });

    if (!result.success) {
      const fieldErrors = flattenError(result.error).fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    dispatch(loginRequest({ email, password }));
  };

  return (
    <div className="max-w-sm mx-auto mt-20 border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <div className="flex items-center gap-2 border rounded px-3 h-10 mb-1">
        <Mail size={16} className="text-gray-500" />
        <input
          className="outline-none text-sm w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {errors.email && (
        <p className="text-red-500 text-sm mb-2">
          {errors.email[0]}
        </p>
      )}

      <div className="flex items-center gap-2 border rounded px-3 h-10 mb-1">
        <Lock size={16} className="text-gray-500" />
        <input
          className="outline-none text-sm w-full"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button> 
      </div>

      {errors.password && (
        <p className="text-red-500 text-sm mb-3">
          {errors.password[0]}
        </p>
      )}

      <button
        onClick={submit}
        className="w-full bg-black text-white h-10 rounded mt-2"
      >
        Login
      </button>

      <p className="text-sm text-gray-600 mt-4 text-center">
        Not registered?{" "}
        <Link href="/auth/register" className="text-black font-medium">
          Create account
        </Link>
      </p>
    </div>
  );
}