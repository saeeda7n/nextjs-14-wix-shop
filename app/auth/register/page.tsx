import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";
import { RegisterForm } from "@/app/auth/register/registerForm";

export const metadata: Metadata = {
 title: "Register new account",
};

const RegisterPage = () => {
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
    <RegisterForm />
   </div>
  </div>
 );
};

export default RegisterPage;
