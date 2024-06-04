"use client";
import RegisterForm from "@/components/RegisterForm";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {useEffect} from "react";

export default function RegisterPage() {
    const router = useRouter();
    const session = useSession();
    useEffect(() => {
        if (session?.status == "authenticated"){
            router.replace("/");
        }
    }, [session, router]);
    return (
        <RegisterForm/>
    );
}
  