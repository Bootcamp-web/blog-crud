import { FastifyPluginAsync,  FastifyRequest, FastifyReply  } from "fastify"



const home = async (request: FastifyRequest, reply: FastifyReply) => {
   
    const data = { title: "Blog by Patricia" };
    reply.view("views/index", data);
}


export const main_router:FastifyPluginAsync =async (app) => {
    app.get("/", home)
    //app.get("/remove",remove)
}