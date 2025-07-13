import { NextResponse } from "next/server";

import dbConnect from "@/app/lib/dbconnect";
import User_Model from "@/app/models/user_model";


export async function POST(req:Request) {



    try {
          await dbConnect();

            const {publicId,content} = await req.json();

if (!publicId || !content) {
      return NextResponse.json({ error: 'publicId and message content are required.' }, { status: 400 });
    }


        const user = await User_Model.findOne({ publicId });
        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }   
    const newMessage = {
      content,
      createdAt: new Date(),
    };

    user.Messages.push(newMessage);
    await user.save();

    return NextResponse.json({ message: 'Feedback submitted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting message:', error);
    return NextResponse.json({ error: 'Server error while submitting message.' }, { status: 500 });
  }
}