
import Link from "next/link";

export default function Home() {


    return(
        <div className="flex justify-center relative">
            <div className="mx-auto py-20">
                <h1 className="text-center text-3xl">Register</h1>
                <div className="rounded-2xl">
                {/* <div className="rounded-2xl bg-white shadow-xl"> */}
                    <div className="lg:p-11">
                        <div className="mb-11">
                            <h1 className="text-gray-900 text-center">Create Account</h1>
                            <p className="text-gray-900 text-center">Get started with your free account</p>
                        </div>
                        <input type="text" 
                            className="w-full h-12 border px-4 mb-1 text-gray-900 placeholder:text-gray-500 font-normal" 
                            placeholder="Username" name="username"
                            />
                        <input type="text" 
                            className="w-full h-12 border px-4 mb-1 text-gray-900 placeholder:text-gray-500 font-normal"  
                            placeholder="Password" name="password" 
                            />
                        <button
                            className="w-full h-12 text-center text-base font-semibold bg-indigo-600 text-white" >Sign Up</button>
                        <Link href="/user/login" className="flex justify-center text-gray-900 font-medium">Have and account? 
                        <span className="text-indigo-600 font font-semibold pl-3">Login</span> </Link>
                    </div>
                </div>
         </div>
    </div>
    )
}

