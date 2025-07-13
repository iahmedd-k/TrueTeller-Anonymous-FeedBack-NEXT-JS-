'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ OTP sent to your email.');
        // Save email to localStorage or pass via router
        localStorage.setItem('email', form.email);
        router.push('/verifyemail');
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      setMessage('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-sky-600 mb-4 text-center">Create Your Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
