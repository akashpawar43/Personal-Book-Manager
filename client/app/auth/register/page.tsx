"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { REGISTER_CLEAR, registerRequest } from "@/redux/auth/auth.actions";
import { registerSchema } from "@/validations/auth.schema";
import { flattenError } from "zod/v4/core";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const { register } = useSelector((state: any) => state.auth);

  const submit = () => {
    const result = registerSchema.safeParse({
      email,
      password
    });

    if (!result.success) {
      const fieldErrors = flattenError(result.error).fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    dispatch(registerRequest({ email, password }));
  };

  useEffect(() => {
    if (register) {
      dispatch({ type: REGISTER_CLEAR });
      router.push("/auth/login");
    }
  }, [register, router]);

  return (
    <div className="max-w-sm mx-auto mt-20 border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <div className="flex items-center gap-2 border rounded px-3 h-10 mb-1">
        <Mail size={16} className="text-gray-500" />
        <input
          className="outline-none text-sm w-full"
          placeholder="Email"
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
          type={showPassword ? "text" : "password"}
          className="outline-none text-sm w-full"
          placeholder="Password"
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
        <p className="text-red-500 text-sm mb-2">
          {errors.password[0]}
        </p>
      )}

      <button
        onClick={submit}
        className="w-full bg-black text-white h-10 rounded mt-2"
      >
        Register
      </button>

      <p className="text-sm text-gray-600 mt-4 text-center">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-black font-medium">
          Login here
        </Link>
      </p>
    </div>
  );
}