"use client"
import LoginForm from "@/components/LoginForm";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const session = useSession();
    useEffect(() => {
        if (session?.status == "authenticated"){
            router.replace("/");
        }
    }, [session, router]);
    return (
        <LoginForm/>
    );
}
