import mongoose, { Model } from 'mongoose';

export interface IUsers {
  _id?: mongoose.Types.ObjectId;
  email?: string;
  phoneNumber: string; 
  password: string;
  agreeToTerms: boolean;
  isRecruiter?: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  cinPanGst?: string;
  companyEmail?: string;
  officeEmail?: string;
  remarks?: string;
  favouriteCourses?: string[];
  id?: string; 
}

const userSchema = new mongoose.Schema<IUsers>(
  {
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String, 
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    agreeToTerms: {
      type: Boolean,
      default: false,
    },
    isRecruiter: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: Date, 
    updatedAt: Date, 
    remarks: {
      type: String,
      default: '',
    },
    favouriteCourses: {
      type: [String],
      default: [],
    },
    officeEmail: {
      type: String,
    },
    cinPanGst: {
      type: String,
    },
    companyEmail: {
      type: String,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<IUsers> =
  mongoose.models.User || mongoose.model<IUsers>('User', userSchema);

export  {UserModel}
