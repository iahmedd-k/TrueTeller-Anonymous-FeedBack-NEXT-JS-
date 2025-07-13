'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Login successful!');
        setTimeout(() => {
          router.push('/dashboard'); // Redirect to dashboard or home
        }, 1500);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-sky-600 mb-4 text-center">Welcome Back</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
