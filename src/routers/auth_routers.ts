import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import { createUser } from "../domain/user.domain";
import fastifyPassport from "fastify-passport"


type MyRequest = FastifyRequest<{
    Body: { username: string; password: string }
}>;

export const auth_router: FastifyPluginAsync = async (app) => {
    app.get("/signup", async (request, reply) => {
        return reply.view("views/auth/signup.hbs")
    })
    app.get("/login", async (request, reply) => {
        return reply.view("views/auth/login.hbs")
    })

  

    app.post("/signup", async (request: MyRequest, reply: FastifyReply) => {
        const { username, password } = request.body;
        try {
            const newUser = await createUser(username, password);
            console.log(`Created user ${newUser.username} with objectid ${newUser._id}`)

            // Auto login the user in session
           await request.logIn(newUser)

            reply.redirect("/");
        } catch (error) {
            return reply.redirect("/error")
        }
    });
    app.post("/login", {
        preValidation: fastifyPassport.authenticate("local", {
            session: true
        })
    }, async (request: MyRequest, reply: FastifyReply) => {
        console.log("SUCCESS!");
        return reply.redirect("/")
    })


    app.get("/logout", async (req, res) => {
        req.logOut();
        res.redirect("/")
    })
}