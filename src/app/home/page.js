"use client"; // This will make the component a Client Component

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

const ProtectedPage = () => {
  const { data: session, status } = useSession();
  const [workOrderCounts, setWorkOrderCounts] = useState({
    open: 0,
    assigned: 0,
    closed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkOrderCounts = async () => {
      try {
        const response = await fetch('/api/workorders');
        const data = await response.json();
        setWorkOrderCounts(data);
      } catch (error) {
        console.error("Error fetching work order counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkOrderCounts();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be authenticated to view this page.</div>;
  }

  const handleCreateWorkOrder = () => {
    // Logic for creating a new work order (e.g., opening a modal or redirecting)
    router = useRouter()
    console.log("Create Work Order button clicked");
    router.push('/form');
    
  };

  return (
<div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-blue-700">Protected Page</h1>
        <p className="text-lg text-gray-600 mt-2">Welcome, {session.user.name}!</p>
      </div>

      {/* Action Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Create New Work Order</h2>
        <Link href="/form">
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Create Work Order
        </button>
        </Link>
          
      </div>

      {/* Analytics Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Work Order Overview</h2>
        
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-5 h-5 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading work order counts...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium text-gray-800">Open Work Orders</h3>
              <p className="text-xl font-semibold text-blue-600">{workOrderCounts.open}</p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-lg font-medium text-gray-800">Assigned Work Orders</h3>
              <p className="text-xl font-semibold text-blue-600">{workOrderCounts.assigned}</p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-lg font-medium text-gray-800">Closed Work Orders</h3>
              <p className="text-xl font-semibold text-blue-600">{workOrderCounts.closed}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProtectedPage;
