"use client";
import { Field, Input, Label } from "@headlessui/react";
import { cn } from "@/libs/utils";
import Link from "next/link";
import React from "react";
import { useWix } from "@/hooks/useWix";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const forgetPasswordSchema = z.object({
 email: z.string().email(),
});

type ForgetPasswordFormProps = z.infer<typeof forgetPasswordSchema>;

export function ForgetPasswordForm() {
 const router = useRouter();
 const wix = useWix();
 const forgetPasswordQuery = useMutation({
  mutationFn: (email: string) =>
   wix.auth.sendPasswordResetEmail(email, "http://localhost:3000"),
  onSettled: () => {
   toast.success("An email sent to you! please check your mailbox!", {
    description:
     "If you didnt get any email within 5 minutes check spam and then try again!",
   });
   router.replace("/auth/login");
  },
 });
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm<ForgetPasswordFormProps>({
  resolver: zodResolver(forgetPasswordSchema),
 });

 async function onSubmit(data: ForgetPasswordFormProps) {
  forgetPasswordQuery.mutate(data.email);
 }

 return (
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
   </Field>

   <div className="flex flex-wrap items-center gap-3">
    <button
     type={"submit"}
     disabled={forgetPasswordQuery.isPending}
     className="flex h-8 items-center gap-2 rounded-md bg-blue-500 px-6 text-gray-50 disabled:opacity-50"
    >
     {forgetPasswordQuery.isPending && (
      <Loader className="animate-spin" size={16} />
     )}
     Restore
    </button>
   </div>
   <Link href={"/auth/register"} className="text-sm font-medium underline">
    Dont have an account?
   </Link>
  </form>
 );
}
