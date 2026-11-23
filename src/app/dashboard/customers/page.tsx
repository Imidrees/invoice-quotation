'use client';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage customer information</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition">
          + Add Customer
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <p className="text-gray-600">Customer management page - coming soon</p>
      </div>
    </div>
  );
}
