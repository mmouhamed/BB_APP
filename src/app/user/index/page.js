import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-4 to-yellow-900 text-white">
      {/* Main Container */}
      <div className="text-center space-y-6">
        {/* Header */}
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">
          Welcome to BusyBee
        </h1>
        <h2 className="text-xl font-semibold mb-4">
          Work Order System - Environmental Services
        </h2>
        
        {/* Subheading */}
        <p className="text-lg font-medium mb-6">
          Safe, Healthy, Stylish, and Professional
        </p>
        
        {/* Action Button */}
        <Link href="/user/login">
          <button className="bg-black text-white mt-4 px-8 py-4 rounded-full transform transition duration-300 ease-in-out  hover:bg-indigo-600 ">
            Submit Work Order
          </button>
        </Link>
      </div>
      
      {/* Optional: Add a subtle footer or tagline */}
      <footer className="absolute bottom-5 text-sm text-white opacity-75">
        <p>© 2024 BusyBee Services. All Rights Reserved.</p>
      </footer>
    </div>

  );
}
