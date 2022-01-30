import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
    username: string,
    password: string
}

const schema = new Schema<UserDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 }
}, {
    timestamps: true
});

export const UserModel = model<UserDocument>("user", schema)