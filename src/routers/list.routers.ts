import {FastifyPluginAsync, FastifyRequest, FastifyReply} from "fastify"
import {Category} from "../models/Categories"
//import {Entry} from "../models/Entry"


type MyRequest = FastifyRequest<{
    Body:{nombre:string,cantidad:string,
        category_name:string, category_benefits:string,};
    Querystring:{receta_id:string}
}>


const add = (request: FastifyRequest, reply:FastifyReply)=>{
    const data ={title: "Add your category"}
    
    reply.view("views/add",data)
}

const form_category = async( request: MyRequest,reply:FastifyReply)=>{
    const { category_name, category_benefits, } = request.body
    const category = await Category.create({
        name:`${category_name} - Patricia`,
        benefits:`${category_benefits} `,
        
    })
}


export  const list_router: FastifyPluginAsync  = async(app)=>{
    //app.post("/form_ingredient",form_ingredient)
    // app.post("/form_category",form_category)
    app.get("/add",add)
    //app.get("/deleteall",deleteall)
}