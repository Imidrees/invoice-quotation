'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalInvoices: number;
  totalQuotations: number;
  recentInvoices: any[];
  recentQuotations: any[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInvoices: 0,
    totalQuotations: 0,
    recentInvoices: [],
    recentQuotations: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        // This will be implemented when we add the stats API
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/dashboard/invoices/create"
          className="bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-lg p-6 transition"
        >
          <div className="text-3xl mb-2">📄</div>
          <h3 className="font-semibold text-blue-900 mb-1">Create Invoice</h3>
          <p className="text-sm text-blue-700">Generate a new invoice for a customer</p>
        </Link>

        <Link
          href="/dashboard/quotations/create"
          className="bg-green-50 border-2 border-green-200 hover:border-green-400 rounded-lg p-6 transition"
        >
          <div className="text-3xl mb-2">📋</div>
          <h3 className="font-semibold text-green-900 mb-1">Create Quotation</h3>
          <p className="text-sm text-green-700">Create a new quotation for a project</p>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Total Invoices</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? '...' : stats.totalInvoices}
              </p>
            </div>
            <div className="text-4xl">📄</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Total Quotations</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? '...' : stats.totalQuotations}
              </p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Invoices</h2>
          </div>
          <div className="p-6">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : stats.recentInvoices.length === 0 ? (
              <p className="text-gray-500">No invoices yet</p>
            ) : (
              <div className="space-y-3">
                {stats.recentInvoices.map((invoice: any) => (
                  <Link
                    key={invoice.id}
                    href={`/dashboard/invoices/${invoice.id}`}
                    className="block hover:bg-gray-50 p-3 rounded transition"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">
                        {invoice.invoiceNumber}
                      </span>
                      <span className="text-indigo-600 font-semibold">
                        SAR {parseFloat(invoice.grandTotal).toLocaleString('en-SA')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {invoice.customer?.name || 'No customer'}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Quotations */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Quotations</h2>
          </div>
          <div className="p-6">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : stats.recentQuotations.length === 0 ? (
              <p className="text-gray-500">No quotations yet</p>
            ) : (
              <div className="space-y-3">
                {stats.recentQuotations.map((quotation: any) => (
                  <Link
                    key={quotation.id}
                    href={`/dashboard/quotations/${quotation.id}`}
                    className="block hover:bg-gray-50 p-3 rounded transition"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">
                        {quotation.quotationRef}
                      </span>
                      <span className="text-green-600 font-semibold">
                        SAR {parseFloat(quotation.grandTotal).toLocaleString('en-SA')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {quotation.customer?.name || 'No customer'}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
