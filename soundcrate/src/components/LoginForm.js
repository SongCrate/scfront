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
        <main className="auth-container p-10 min-w-[400px] w-[30vw] max-w-[1300px] mx-auto bg-dark-light flex items-center justify-center border-2 border-dark-dark mb-10">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className={"text-3xl flex items-center justify-center"}>Login</h2>
                <p className={"mt-7"} >Email</p>
                <input onChange={e => setEmail(e.target.value)} type="text" name="email" className={"bg-light  h-12 mt-1 text-dark-dark"}/>
                <p className={"mt-6"}>Password</p>
                <input onChange={e => setPassword(e.target.value)} type="password" name="password" className={"bg-light  h-12 mt-1 text-dark-dark"}/>
                <button className={"bg-dark-dark h-12 w-80 mt-4 rounded-md font-bold"}>Login</button>

                { error && (
                    <div className={"text-red text- pt-4"}>
                        {error}
                    </div>)
                }

                <div className="register flex items-center justify-center mt-14">Not with us yet?
                    <Link href="/register" className={"underline ml-1"}>Register</Link>
                </div>
            </form>
        </main>
    );
}