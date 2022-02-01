import { FastifyInstance } from "fastify"
import fastifyPassport from "fastify-passport"
import { UserDocument, UserModel } from "../models/User.model";
import { local_strategy } from "./strategy/local.strategy";


fastifyPassport.registerUserSerializer<UserDocument, any>(async (user, request) => {
    console.log("serializing...");
    return user.id
});


fastifyPassport.registerUserDeserializer<UserDocument, any>(async (user_id) => {
    console.log("deserializing...");
    const user = await UserModel.findById(user_id)
    if (!user) {
        throw new Error("User not found")
    }
    return user.toObject(); 
});

export const preparePassport = async (app: FastifyInstance) => {
    await app.register(fastifyPassport.initialize());
    await app.register(fastifyPassport.secureSession());

  
    await fastifyPassport.use(local_strategy);

    console.log("passport ready")
}