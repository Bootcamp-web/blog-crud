import { FastifyPluginAsync,  FastifyRequest, FastifyReply  } from "fastify"
import { getEntry, Category } from "../models/Categories";



const home = async (request: FastifyRequest, reply: FastifyReply) => {
    const categories = await Category.find().lean();
    let category_entry = []
    for (let category of categories){
        console.log(category)
        const entries = await getEntry(category._id);
        category_entry.push({
            category,
            entries
        })
   }

  
    const data = { title: "Blog by Patricia with categories",categories:category_entry };
    
    reply.view("views/index", data);
}


export const main_router:FastifyPluginAsync =async (app) => {
    app.get("/", home)
    //app.get("/remove",remove)
}