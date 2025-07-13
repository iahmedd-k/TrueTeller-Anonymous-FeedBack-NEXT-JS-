import { NextResponse } from 'next/server';
import dbConnect from "@/app/lib/dbconnect";
import User_Model from "@/app/models/user_model";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, otp } = await req.json();
    console.log("Received data:", { email, otp });

    const user = await User_Model.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: 'Email already verified' }, { status: 200 });
    }

    const now = new Date();
    console.log('Stored OTP:', user.verificationCode);
console.log('Received OTP:', otp);
console.log('Stored Expiry:', user.V_Code_Exp);
console.log('Current Time:', now);
    if (String(user.verificationCode) !== String(otp) || user.V_Code_Exp < now) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.V_Code_Exp = undefined;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
  } catch (err) {
    console.error('OTP Verify Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
