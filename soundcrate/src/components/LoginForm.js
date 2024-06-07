"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {signIn} from "next-auth/react";
import {useState} from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!email || !password){
            setError("All fields are necessary.");
            return;
        }
        if (!isValidEmail(email)){
            setError("Email is invalid");
            return;
        }
        try {
            const res = await signIn("credentials", {
                redirect:false,
                email,
                password
            });
            if (res?.error){
                setError("Invalid email or password");
                const form = e.target;
                form.reset();
                if (res?.url){router.replace("/")}
            } else{
                setError("")
                router.replace("/");
            }
        }catch(error){
            setError("An unexpected error occurred.");
            return;
        }
    };

    return (
        <main className="box-container p-10 min-w-[400px] w-[25vw] max-w-[1300px] mx-auto bg-dark-light flex flex-col items-center justify-center gap-8">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <h2 className={"text-2xl font-semibold flex items-center justify-center mb-4"}>
                    Welcome Back!
                </h2>
                <label htmlFor="email-input" className="block text-sm font-medium text-light">
                    Email
                </label>
                <input id="email-input" onChange={e => setEmail(e.target.value)} type="text" name="email"/>
                <label htmlFor="password-input" className="block text-sm font-medium text-light">
                    Password
                </label>
                <input id="password-input" onChange={e => setPassword(e.target.value)} type="password" name="password"/>
                
                <button type="submit" className={"bg-accent hover:bg-opacity-80 h-12 w-80 mt-4 rounded-md font-semibold"}>Login</button>

                { error && (
                    <div className={"text-red text- pt-4"}>
                        {error}
                    </div>)
                }
            </form>
            <div className="register flex items-center justify-center opacity-80">
                Not with us yet?
                <Link href="/register" className={"text-light underline underline-offset-4 decoration-accent ml-1"}>Create an Account</Link>
            </div>
        </main>
    );
}