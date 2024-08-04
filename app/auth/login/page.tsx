import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";
import { LoginForm } from "@/app/auth/login/loginForm";

export const metadata: Metadata = {
 title: "Sign in",
};

const LoginPage = () => {
 return (
  <div className="relative flex flex-1 flex-col justify-center gap-8 bg-white px-8 pb-16 pt-24">
   <Link
    href="/"
    className="absolute top-8 flex items-center gap-2 text-sm text-gray-500"
   >
    <MoveLeftIcon size={16} />
    Back to Shop name
   </Link>
   <h2 className="text-4xl font-black">Welcome Back!</h2>
   <div>
    <LoginForm />
   </div>
  </div>
 );
};

export default LoginPage;
