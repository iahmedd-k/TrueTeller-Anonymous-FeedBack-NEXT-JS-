import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbconnect";
import User_Model from "@/app/models/user_model";
import bcrypt from 'bcryptjs';

export async function POST(req:Request) {

    try {
        
      await dbConnect();
      const {email, password} = await req.json();


      const user = await User_Model.findOne({email});
      if(!user) {
        return NextResponse.json({
          message: "User not found",
          success: false
        }, {
          status: 404
        });
      } 

      if(!user.isVerified) {
        return NextResponse.json({
          message: "User is not verified",
          success: false
        }, {
          status: 403
        });
      }
 const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }
     return NextResponse.json({
      message: 'Login successful',
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
