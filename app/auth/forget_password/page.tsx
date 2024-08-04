import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";
import { ForgetPasswordForm } from "@/app/auth/forget_password/forgetPasswordForm";

export const metadata: Metadata = {
 title: "Forget password",
};

const ForgetPasswordPage = () => {
 return (
  <div className="relative flex flex-1 flex-col justify-center gap-8 bg-white px-8 pb-16 pt-24">
   <Link
    href="/auth/login"
    className="absolute top-8 flex items-center gap-2 text-sm text-gray-500"
   >
    <MoveLeftIcon size={16} />
    Back to sign in
   </Link>
   <h2 className="text-4xl font-black">Restore your account!</h2>
   <div>
    <ForgetPasswordForm />
   </div>
  </div>
 );
};

export default ForgetPasswordPage;
