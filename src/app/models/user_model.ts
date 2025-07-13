import mongoose, {Document, Schema, model} from 'mongoose';


export interface Message_Interface extends Document {
    content: string;
    createdAt: Date;
}



const message_schema = new Schema <Message_Interface > ({

  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, 
{
  timestamps: true

}
)



export interface User_Interface extends Document{

   _id: string;
   username: string;
    email: string;
    publicId: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isAcceptingMessages: boolean;
    verificationCode: string;
    V_Code_Exp: Date;
    Messages: Message_Interface[];
isVerified: boolean;

}

const userSchema = new Schema <User_Interface>({

     username: {
    type: String
      },
email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
     isAcceptingMessages: {
        type: Boolean
    },
    verificationCode: {
        type: String
    },

    V_Code_Exp: {
        type: Date
    },  
    publicId: {
      type: String,
  unique: true,
  required: true,
    },

isVerified:{
  type: Boolean,
  default: false
},

    createdAt: {
      type: Date,
      default: Date.now,
    },
  
  Messages: [message_schema],
  
},
  
   {
    timestamps: true
  }

);

const User_Model = mongoose.models['NEXT_USER'] || mongoose.model<User_Interface>('NEXT_USER', userSchema);
export default User_Model;