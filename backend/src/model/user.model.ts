import { Document, model, Schema, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String },
    },
    { timestamps: true },
);

export const UserModel = model("Users", userSchema);
