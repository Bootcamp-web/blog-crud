import {FastifyPluginAsync} from "fastify"
import formBodyPlugin from "fastify-formbody";
import fastifyStatic from "fastify-static";
import path from "path";
import pointOfView from "point-of-view";
import { main_router } from "./routers/main.routers";
import { list_router } from "./routers/list.routers";
import { auth_router } from "./routers/auth_routers";
import { middlewareEnviroment } from "./midlewares/enviroment.middleware"
import { sessionEnviroment } from "./midlewares/cookie.middleware"
import  mongoose  from "mongoose";
import { DB_URL } from "./config";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify";
import { fastifyMongodb } from "fastify-mongodb";
import cookie, { FastifyCookieOptions } from "fastify-cookie";
import MongoStore from "connect-mongo";
import fastifySession from "@fastify/session";


declare module "fastify" {
    interface Session {
        user: { name: string };
        counter: number;
        env: {
            browser: string,
            os: string,
        }
    }
}



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

    app.register(fastifyMongodb, {
        forceClose: true,
        url: DB_URL,
        name: "MONGO1"
    });
    app.register(cookie, {
        secret: "my-secret", // for cookies signature
        parseOptions: {}     // options for parsing cookies
    } as FastifyCookieOptions);
    const store: unknown = MongoStore.create({ mongoUrl: DB_URL })

    app.register(fastifySession, {
        cookieName: 'YOUR_SESSION_COOKIE_NAME',
        secret: "the secret must have length 32 or greater",
        cookie: {
            secure: false
        },
        store: store as fastifySession.SessionStore
    })

    app.addHook("preHandler", async (request: FastifyRequest, reply: FastifyReply) => {
        request.session.user = { name: "Patricia" };
    })
    app.addHook('preHandler', (request, reply, next) => {
        const session = request.session;
        request.sessionStore.set(session.sessionId, session, next);
    })
  
    app.register(formBodyPlugin);
    app.register(main_router);
    app.register(auth_router,{prefix: "/auth"});
    app.register(list_router, { prefix: "/list" });
    app.register(middlewareEnviroment);
    app.register(sessionEnviroment);
}