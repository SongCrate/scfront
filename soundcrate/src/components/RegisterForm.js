"use client";
import Link from "next/link";
import { useState } from "react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

export default function RegisterForm() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter();

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }
    const isValidPassword = (password) =>{
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmedPassword ){
            setError("All fields are necesarry.");
            return;
        }
        if (!isValidEmail(email)){
            setError("Email is invalid");
            return;
        }
        if (!isValidPassword(password)){
            setError("Password must include:\n" +
                "8 characters or longer\n" +
                "A minimum of 1 lower case letter\n" +
                "A minimum of 1 upper case letter\n" +
                "A minimum of 1 numeric character\n" +
                "A minimum of 1 special character\n"
            );
            return;
        }
        if (password !== confirmedPassword){
            setError("Passwords must be the same");
            return;

        } else {
            setError("")
            try {
                const res = await fetch("api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    }),
                });

                if (res.ok ) {
                    const form = e.target;
                    await signIn("credentials", {
                        redirect:false,
                        email,
                        password
                    });
                    form.reset();
                    router.replace("/");
                }
                else {
                    const data = await res.json();
                    setError(data.error);
                    return;
                }
            }catch(error){
                console.log("Error during registration: ", error);
                setError("An unexpected error occurred.");
                return;
            }
        }
    };

    return (
        <main className="box-container p-10 min-w-[400px] w-[25vw] max-w-[1300px] mx-auto bg-dark-light flex flex-col items-center justify-center gap-8">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <h2 className={"text-2xl font-semibold flex items-center justify-center mb-4"}>
                    Register
                </h2>
                <label htmlFor="username-input" className="block text-sm font-medium text-light">
                    Username
                </label>
                <input id="username-input" onChange={e => setUsername(e.target.value)} type="text" name="username"/>
                <label htmlFor="email-input" className="block text-sm font-medium text-light">
                    Email
                </label>
                <input id="email-input" onChange={e => setEmail(e.target.value)} type="text" name="email"/>
                <label htmlFor="password-input" className="block text-sm font-medium text-light">
                    Password
                </label>
                <input id="password-input" onChange={e => setPassword(e.target.value)} type="password" name="password"/>
                <label htmlFor="confirm-password-input" className="block text-sm font-medium text-light">
                    Confirm Password
                </label>
                <input id="confirm-password-input" onChange={e => setConfirmedPassword(e.target.value)} type="password" name="confirmpassword"/>

                <button type="submit" className={"bg-accent hover:bg-opacity-80 h-12 w-80 mt-4 rounded-md font-semibold"}>Create Account</button>

                { error && (
                    <div className={"text-red text- pt-4"} style={{ whiteSpace: 'pre-line'}}>
                        {error}
                    </div>)
                }
            </form>
            <div className="register flex items-center justify-center opacity-80">
                Already have an account?
                <Link href="/login" className={"text-light underline underline-offset-4 decoration-accent ml-1"}>Login</Link>
            </div>
        </main>
    );
}