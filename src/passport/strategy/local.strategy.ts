
import { Strategy as LocalStrategy } from "passport-local";
import { checkPassword } from "../../domain/user.domain";
import { UserModel } from "../../models/User.model";

export const local_strategy = new LocalStrategy(async (username: string, password: string, done: any) =>{
    const foundUser = await UserModel.findOne({username});
    if (foundUser) {
        if (checkPassword(foundUser, password)) {
            console.log("LOGIN OK")
            return done(null, foundUser)
        }
        return done(null, false, {
            message: "Incorrect password"
        })
    } else {
        console.log("User not found");
        return done(null, false, {
            message: "User not found"
        })
    }
})