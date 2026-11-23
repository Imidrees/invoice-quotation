'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Quotation {
  id: string;
  quotationRef: string;
  quotationDate: string;
  grandTotal: string;
  status: string;
}

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyFilter, setCompanyFilter] = useState('');
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    // Fetch companies first
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/companies');
        const data = await response.json();
        setCompanies(data);
        if (data.length > 0) {
          setCompanyFilter(data[0].id);
        }
      } catch (err) {
        console.error('Failed to fetch companies:', err);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (!companyFilter) return;

    const fetchQuotations = async () => {
      try {
        const response = await fetch(`/api/quotations?companyId=${companyFilter}`);
        const data = await response.json();
        setQuotations(data.data || []);
      } catch (err) {
        console.error('Failed to fetch quotations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotations();
  }, [companyFilter]);

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Quotations</h1>
          <p className="text-gray-600 mt-1">Manage and view all quotations</p>
        </div>
        <Link
          href="/dashboard/quotations/create"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          + Create Quotation
        </Link>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Company
        </label>
        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
        >
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading quotations...</div>
        ) : quotations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No quotations found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Reference
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Total (SAR)
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quotations.map((quotation) => (
                  <tr
                    key={quotation.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {quotation.quotationRef}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(quotation.quotationDate).toLocaleDateString('en-SA')}
                    </td>
                    <td className="px-6 py-4 font-semibold text-green-600">
                      {parseFloat(quotation.grandTotal).toLocaleString('en-SA')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        quotation.status === 'saved'
                          ? 'bg-green-100 text-green-800'
                          : quotation.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/quotations/${quotation.id}`}
                        className="text-green-600 hover:text-green-900 font-semibold text-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
