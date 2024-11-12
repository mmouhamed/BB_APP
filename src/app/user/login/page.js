"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter(); // Initialize useRouter

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            username,
            password,
        });

        if (result.error) {
            setError(result.error);
        } else {
            // Redirect to the desired page on successful login
            router.push('/home'); // Change '/' to your desired route, e.g., '/dashboard'
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-center relative">
                <div className="mx-auto py-20">
                    <h1 className="text-center text-3xl">Login</h1>
                    <div>
                        <div className="lg:p-11">
                            <div className="mb-11">
                                <h1 className="text-gray-900 text-center">Welcome to BB App</h1>
                                <p className="text-gray-900 text-center">Let's get started with your 30 days free trial</p>
                            </div>
                            <input
                                type="text"
                                className="w-full h-12 border-gray-300 border px-4 mb-1"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                name="username"
                            />

                            <input
                                type="password" // Changed to password type
                                className="w-full h-12 border-gray-300 border px-4 mb-1"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password" // Corrected the name to match the server expectation
                            />

                            {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}

                            <Link href='#' className="flex justify-end">
                                <span>Forgot Password?</span>
                            </Link>
                            <button
                                type="submit" // Added type submit
                                className="w-full h-12 font-semibold bg-indigo-600 text-white"
                            >
                                Login
                            </button>
                            <Link href='/user/register' className="flex justify-center font-medium">
                                Don't have an account? <span className="text-indigo-600 font-semibold pl-3">Sign Up</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}












