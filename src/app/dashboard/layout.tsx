'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to sign out?')) return;

    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const isActive = (path: string) => pathname?.startsWith(path);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'All Invoices', href: '/dashboard/invoices', icon: '📄' },
    { label: 'All Quotations', href: '/dashboard/quotations', icon: '📋' },
    { label: 'Customers', href: '/dashboard/customers', icon: '👥' },
    { label: 'Search', href: '/dashboard/search', icon: '🔍' },
    { label: 'Archive', href: '/dashboard/archive', icon: '📦' },
    { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 shadow-sm transition-all duration-300 overflow-y-auto`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="text-2xl">📊</div>
            {isSidebarOpen && (
              <span className="font-bold text-gray-900 text-sm truncate">
                Invoice & Quotation
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive(item.href)
                  ? 'bg-indigo-50 text-indigo-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && <span className="text-sm truncate">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm mb-2"
          >
            {isSidebarOpen ? '← Collapse' : '→ Expand'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold"
          >
            {isSidebarOpen ? 'Sign Out' : '🚪'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {pathname?.includes('invoices')
              ? 'Invoices'
              : pathname?.includes('quotations')
              ? 'Quotations'
              : pathname?.includes('customers')
              ? 'Customers'
              : pathname?.includes('search')
              ? 'Search Documents'
              : pathname?.includes('archive')
              ? 'Archive'
              : pathname?.includes('settings')
              ? 'Settings'
              : 'Dashboard'}
          </h1>
          <div className="text-sm text-gray-600">
            {new Date().toLocaleDateString('en-SA', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
