// app/not-found.tsx

'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex flex-col items-center justify-center px-6 py-12 text-center">
      {/* Stylized SVG 404 */}
      <div className="mb-10">
        <svg
          className="w-64 h-64 mx-auto"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="250" cy="250" r="250" fill="url(#grad404)" />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="100"
            fontWeight="700"
            fill="white"
          >
            404
          </text>
          <defs>
            <linearGradient id="grad404" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Message */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Page Not Found</h1>
      <p className="text-blue-100 text-lg max-w-xl mb-8">
        The page you’re looking for doesn’t exist or has been moved. Let’s get you back on track.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-2xl backdrop-blur-sm transition-all"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Go Back
        </button>
        <button
          onClick={() => router.push('/')}
          className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl shadow-md transition-all"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
