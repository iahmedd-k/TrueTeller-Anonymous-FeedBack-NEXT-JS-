import dbConnect from '@/app/lib/dbconnect';
import User_Model from '@/app/models/user_model';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  await dbConnect();

  // TEMPORARY: hardcoded email (or username or publicId)
  const user = await User_Model.findOne({ email: 'ahmedkhanofficials@gmail.com' });

  if (!user) redirect('/login'); // or show custom error

  const feedbackUrl = `http://localhost:3000/u/${user.publicId}`;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Dashboard</h1>

      <div className="bg-white shadow p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-gray-800">👤 Username:</h2>
        <p className="text-blue-600">{user.username}</p>

        <h2 className="mt-4 text-lg font-semibold text-gray-800">🔗 Your Feedback Link:</h2>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="text"
            readOnly
            value={feedbackUrl}
            className="w-full border p-2 rounded text-sm"
          />
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
   
          >
            Copy
          </button>
        </div>
      </div>

      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">📥 Messages</h2>

        {user.Messages?.length > 0 ? (
          <ul className="space-y-3">
            {user.Messages.map((msg: any, idx: number) => (
              <li key={idx} className="border border-gray-200 rounded p-3 bg-blue-50 text-gray-800">
                {msg.content}
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
