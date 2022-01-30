import { UserDocument, UserModel } from "../models/User.model";
import bcrypt from "bcryptjs"


export const createUser = async (username: string, plainPassword: string) => {
    const password = hash(plainPassword)
    const userDoc = await UserModel.create({ username, password });
    console.log(`User ${userDoc.username} has been created with id:${userDoc._id}`);
    return userDoc;
}

const hash = (plainPassword: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainPassword, salt);
}

export const checkPassword = (user: UserDocument, plainPassword: string) => {
    return bcrypt.compareSync(plainPassword, user.password)
}

export const deleteUser = async (username: string) => {
    const deleted = await UserModel.findOneAndDelete({ username });
    if (deleted) {
        console.log(`💀 User ${deleted.username} has been deleted`)
        return true;
    }
    console.log(`There's no user with username ${username} to be deleted`);
    return false;
}