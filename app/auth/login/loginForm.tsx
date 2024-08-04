"use client";
import { Description, Field, Input, Label } from "@headlessui/react";
import { cn } from "@/libs/utils";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWix } from "@/hooks/useWix";
import { LoginState } from "@wix/sdk";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { setCookies } from "@/server/actions/auth";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
 email: z.string().email(),
 password: z.string().min(1, { message: "Please enter a valid password." }),
});

type SchemaType = z.infer<typeof loginSchema>;

export function LoginForm() {
 const wix = useWix();
 const router = useRouter();
 const [loading, setLoading] = useState(false);
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm<SchemaType>({
  resolver: zodResolver(loginSchema),
 });

 const loginQuery = useMutation({
  mutationFn: login,
 });

 async function login(credentials: SchemaType) {
  const result = await wix.auth.login(credentials);
  switch (result.loginState) {
   case LoginState.SUCCESS: {
    setLoading(true);
    return toast.promise(
     wix.auth.getMemberTokensForDirectLogin(result.data.sessionToken),
     {
      loading: "One more step ...",
      success: onLoginSuccess,
      finally: () => setLoading(false),
     },
    );
   }
   case LoginState.FAILURE:
    return toast.error("Wrong credentials!");
   default: {
    return toast.error(result.loginState);
   }
  }
 }

 async function onSubmit(data: SchemaType) {
  loginQuery.mutate(data);
 }

 async function onLoginSuccess(
  data: Awaited<ReturnType<typeof wix.auth.getMemberTokensForDirectLogin>>,
 ) {
  wix.auth.setTokens(data);
  await setCookies(data);
  router.replace("/");
  return "Welcome back!";
 }

 return (
  <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
   <Field>
    <Label className="text-sm/6 font-medium">Email</Label>
    <Input
     {...register("email")}
     type="email"
     placeholder="youremail@domain.com"
     className={cn(
      "mt-1 block w-full rounded-lg border-none bg-gray-100 px-3 py-2",
      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25",
     )}
    />
    {errors.email && (
     <Description className="text-sm text-red-600">
      {String(errors.email.message)}
     </Description>
    )}
   </Field>
   <Field>
    <Label className="text-sm/6 font-medium">Password</Label>
    <Input
     {...register("password")}
     type="password"
     placeholder="Password"
     className={cn(
      "mt-1 block w-full rounded-lg border-none bg-gray-100 px-3 py-2",
      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25",
     )}
    />
    {errors.password && (
     <Description className="text-sm text-red-600">
      {String(errors.password.message)}
     </Description>
    )}
   </Field>
   <div className="flex flex-wrap items-center gap-3">
    <button
     type={"submit"}
     disabled={loginQuery.isPending || loading}
     className="flex h-8 items-center gap-2 rounded-md bg-blue-500 px-6 text-gray-50 disabled:opacity-50"
    >
     {(loginQuery.isPending || loading) && (
      <Loader className="animate-spin" size={16} />
     )}
     Sign in
    </button>
    <Link href={"/auth/forget_password"} className="text-sm text-gray-700">
     Forget your password?
    </Link>
   </div>
   <Link href={"/auth/register"} className="text-sm font-medium underline">
    Dont have an account?
   </Link>
  </form>
 );
}
