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
        <main className="auth-container p-10 min-w-[400px] w-[30vw] max-w-[1300px] mx-auto bg-dark-light flex items-center justify-center border-2 border-dark-dark mb-10">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 className={"text-3xl flex items-center justify-center"}>Register</h2>
                <p className={"mt-7"}>Username</p>
                <input onChange={e => setUsername(e.target.value)} type="text" name="username" className={"bg-light h-12 w-80 mt-1 text-dark-dark"}/>
                <p className={"mt-6"}>Email</p>
                <input onChange={e => setEmail(e.target.value)} type="text" name="email" className={"bg-light  h-12 mt-1 text-dark-dark"}/>
                <p className={"mt-6"}>Password</p>
                <input onChange={e => setPassword(e.target.value)} type="password" name="password" className={"bg-light  h-12 mt-1 text-dark-dark"}/>
                <p className={"mt-6"}>Confirm Password</p>
                <input onChange={e => setConfirmedPassword(e.target.value)} type="password" name="confirmpassword" className={"bg-light h-12 mt-1 text-dark-dark"}/>

                <button className={"bg-dark-dark h-12 w-80 mt-4 rounded-md font-bold"}>Register</button>

                { error && (
                    <div className={"text-red text- pt-4"} style={{ whiteSpace: 'pre-line'}}>
                        {error}
                    </div>)
                }

                <div className="register flex items-center justify-center mt-14">Already have an account?
                    <Link href="/login" className={"underline ml-1"}>Login</Link>
                </div>
            </form>
        </main>
    );
}