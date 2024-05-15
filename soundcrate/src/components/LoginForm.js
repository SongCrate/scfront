"use client";
import Link from "next/link";
import {useState} from "react";
import { useRouter } from 'next/navigation';
export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const handleSubmit = async(e) => {
        e.preventDefault();


        if (!email || !password){
            setError("All fields are necesarry.");
            return;
        }
        try {
            const res = await fetch("api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (res.ok ) {
                const form = e.target;
                const data = await res.json();
                sessionStorage.setItem("username", data.username);
                setError("");
                form.reset();

                window.location.reload()
                router.push('/');

            }
            else {
                const data = await res.json();
                setError(data.error);
                return;
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