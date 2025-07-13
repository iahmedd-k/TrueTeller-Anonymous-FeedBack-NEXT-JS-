import dbConnect from '@/app/lib/dbconnect';
import User_Model from '@/app/models/user_model';
import { notFound } from 'next/navigation';

import MessageForm from './MessageForm';
export default async function FeedbackPage({ params }: { params: { publicId: string } }) {
  await dbConnect();

  const user = await User_Model.findOne({ publicId: params.publicId });
  if (!user) return notFound();

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Send anonymous feedback 
      </h1>

      <div className="bg-white p-4 rounded shadow">
        <MessageForm publicId={params.publicId} />
      </div>
    </div>
  );
}
