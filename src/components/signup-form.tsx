"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useToast } from "@/hooks/use-toast";

import { createAccount } from "@/server/actions/auth";

import { cn } from "@/lib/utils";


export function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.password.value !== form.passwordre.value) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    try {
      const data = {
        id: crypto.randomUUID(),
        name: `${form.firstname.value} ${form.lastname.value}`,
        email: form.email.value,
        password: form.password.value,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await createAccount(data);
      toast({
        title: "Account created successfully",
      });
      router.push("/");
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Failed to create account",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Create an account to get started,{" "}
        Already have an account?{" "}
        <Link href="/login" className="text-primary-500 dark:text-primary-400 underline">
          Login
        </Link>
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" required />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="passwordre">Re-enter Password</Label>
          <Input
            id="passwordre"
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
