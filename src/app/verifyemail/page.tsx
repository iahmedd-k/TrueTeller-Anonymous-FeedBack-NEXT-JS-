'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ OTP verified successfully!');
        localStorage.removeItem('email');
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        setMessage(data.message || 'OTP verification failed');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-sky-600 mb-4 text-center">Verify Your Email</h1>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            placeholder="Email"
            value={email}
            disabled
            className="border rounded-lg p-3 w-full bg-gray-100 text-gray-500"
          />
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Verify
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
