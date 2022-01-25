import {FastifyPluginAsync, FastifyRequest, FastifyReply} from "fastify"
import {Category} from "../models/Categories"
import { Entry } from "../models/Entry"
//import {Entry} from "../models/Entry"


type MyRequest = FastifyRequest<{
    Body:{entry_name:string,entry_benefits:string,
        category_name:string, category_benefits:string,
    };
    Querystring:{category_id:string}
}>


const deleteall = async (request: MyRequest, reply:FastifyReply)=>{
    await Category.deleteMany();
    reply.redirect("/")
}

const add = (request: FastifyRequest, reply:FastifyReply)=>{
    const data ={title: "Add your category"}
    
    reply.view("views/add",data)
}

const form_category = async( request: MyRequest,reply:FastifyReply)=>{
    const { category_name, category_benefits, } = request.body
    console.log(category_name, category_benefits)
    const category = await Category.create({
        name:`${category_name} - Patricia`,
        benefits: category_benefits,
        
    })
    const doc = await category.save()
    console.log(`Created  ${category.name} with id ${doc._id}`)
    reply.redirect("/")
}

const form_entry = async( request: MyRequest,reply:FastifyReply)=>{
    const { entry_name, entry_benefits, } = request.body
    const { category_id } = request.query;
    const entry = await Entry.create({
        name:entry_name,
        benefits: entry_benefits,
        img:"yoga.jpeg",
        category:category_id
        
    })
    const doc = await entry.save()
    console.log(`Created  ${entry.name} with id ${doc._id}`)
    reply.redirect("/")
}



export  const list_router: FastifyPluginAsync  = async(app)=>{
    app.post("/form_entry",form_entry)
    app.post("/form_category",form_category)
    app.get("/add",add)
    app.get("/deleteall",deleteall)
}