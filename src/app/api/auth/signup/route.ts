import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbconnect";
import User_Model from "@/app/models/user_model";
import { sendVerificationEmail } from "@/app/lib/sendVerifiationEmail";
import bcrypt from 'bcryptjs';
import { isCryptoKey } from "util/types"; 



export async function POST (req: Request)
{

    try {

        await dbConnect();
        const {username, email, password} = await req.json();
        console.log("Received data:", { username, email, password });
         
const publicId = Array.from(crypto.getRandomValues(new Uint8Array(4)))
  .map((b) => b.toString(16).padStart(2, '0'))
  .join('');    
  
  const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
const V_Code_Exp = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
        const newUser = new User_Model({
            username,
            email,
            publicId,
            password: hashedPassword,
            isAcceptingMessages: true,
            verificationCode,
            V_Code_Exp,
            isVerified: false
        })
        await newUser.save();

        await sendVerificationEmail(email, verificationCode);

 return NextResponse.json({ message: 'Signup successful. OTP sent to email.' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }


}