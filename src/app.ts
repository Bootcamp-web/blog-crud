import {FastifyPluginAsync} from "fastify"
import formBodyPlugin from "fastify-formbody";
import fastifyStatic from "fastify-static";
import path from "path";
import pointOfView from "point-of-view";
import { main_router } from "./routers/main.routers";
import { list_router } from "./routers/list.routers";
import  mongoose  from "mongoose";
import { DB_URL } from "./config";

export const main_app: FastifyPluginAsync =async (app) => {
    mongoose.connect(DB_URL).then(()=>{
      console.log(`Connected to ${DB_URL}`)
  })
    app.register(fastifyStatic,{
        root: path.join(__dirname, "../public"),
        prefix: "/staticFiles/",
    });

    app.register(pointOfView, 
    {
        engine: {
            handlebars: require("handlebars"),
        },
        layout: "./views/layouts/main.hbs",
        options:{
            partials:{
                entry:'/views/partials/entry.hbs',
                category:'/views/partials/category.hbs',
                menu:'views/partials/menu.hbs',
                add_entry:'views/partials/forms/add_entry.hbs',
                add_category:'views/partials/forms/add_category.hbs'
            }
        }
    });
    app.register(formBodyPlugin);
    app.register(main_router);
    app.register(list_router, { prefix: "/list" });
}