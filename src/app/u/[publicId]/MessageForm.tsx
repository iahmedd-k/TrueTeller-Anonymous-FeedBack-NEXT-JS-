'use client';

import { useState } from 'react';

export default function MessageForm({ publicId }: { publicId: string }) {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/message/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId, content }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('✅ Feedback sent!');
      setContent('');
    } else {
      setStatus(data.error || '❌ Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        placeholder="Type your message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={5}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>
      {status && <p className="text-sm text-gray-700">{status}</p>}
    </form>
  );
}
