import { FastifyPluginAsync,  FastifyRequest, FastifyReply  } from "fastify"
import { getEntry, Category } from "../models/Categories";
import { Entry } from "../models/Entry";

type Myrequest = FastifyRequest<{
    Querystring: { id: string }
}>

const home = async (request: FastifyRequest, reply: FastifyReply) => {
    const categories = await Category.find().lean();
    let category_entry = []
  
    for (let category of categories){
       
        const entries = await getEntry(category._id);
        category_entry.push({
            category,
            entries
        })
   }

  
    const data = { title: "Blog by Patricia with categories",categories:category_entry };
    
    reply.view("views/index", data);
}

const remove = async(request: Myrequest, reply: FastifyReply) => {
    const { id } = request.query
    console.log(`Deleted entry ${id}..`)
    await Entry.findByIdAndDelete(id)
    reply.redirect("/")
}


export const main_router:FastifyPluginAsync =async (app) => {
    app.get("/", home)
    app.get("/remove",remove)
    app.get("/error",async (request,reply)=>{
        return  reply.view("views/error.hbs");
    })
}