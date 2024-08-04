"use client";
import { Description, Field, Input, Label } from "@headlessui/react";
import { cn } from "@/libs/utils";
import Link from "next/link";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoginState } from "@wix/sdk";
import { useWix } from "@/hooks/useWix";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
 profile: z.object({
  nickname: z.string().min(4, "Username must contain at last 4 characters!"),
 }),
 email: z.string().email(),
 password: z.string().min(8, "Password must contain at last 8 characters!"),
});

type RegisterFormProps = z.infer<typeof registerSchema>;

export function RegisterForm() {
 const router = useRouter();
 const wix = useWix();
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm<RegisterFormProps>({
  resolver: zodResolver(registerSchema),
 });

 const registerQuery = useMutation({
  mutationFn: createAccount,
 });

 async function createAccount(account: RegisterFormProps) {
  const result = await wix.auth.register(account);

  switch (result.loginState) {
   case LoginState.SUCCESS:
    return (
     toast.success(
      "Congratulations, your account has been created successfully.",
      { description: "You can sign in now." },
     ),
     router.replace("/auth/login")
    );
   default:
    return toast.error("Something went wrong!", {
     description: result.loginState,
    });
  }
 }

 async function onSubmit(data: RegisterFormProps) {
  registerQuery.mutate(data);
 }

 return (
  <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
   <Field>
    <Label className="text-sm/6 font-medium">Username</Label>
    <Input
     {...register("profile.nickname")}
     type="text"
     placeholder="Jake, Sofia2021, ..."
     className={cn(
      "mt-1 block w-full rounded-lg border-none bg-gray-100 px-3 py-2",
      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25",
     )}
    />
    {errors.profile?.nickname && (
     <Description className="text-sm text-red-600">
      {String(errors.profile?.nickname.message)}
     </Description>
    )}
   </Field>

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
     disabled={registerQuery.isPending}
     className="flex h-8 items-center gap-2 rounded-md bg-blue-500 px-6 text-gray-50 disabled:opacity-50"
    >
     {registerQuery.isPending && <Loader className="animate-spin" size={16} />}
     Create Account
    </button>
   </div>
   <Link href={"/auth/login"} className="text-sm font-medium underline">
    Already have an account?
   </Link>
  </form>
 );
}
