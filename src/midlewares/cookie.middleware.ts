import { FastifyPluginAsync } from "fastify";
import fp from 'fastify-plugin';
import _ from "lodash"

export const sessionEnviroment: FastifyPluginAsync = fp(async (app) => {
    console.log("Instalando plugin con hook custom");
    app.addHook("onRequest", async (request, reply) => {
        const { session } = request;
        session.counter ? session.counter++ : (session.counter = 1)

        // get current env
        const currentEnv = {
            browser: request.browser,
            os: request.os,
        }
        console.log(currentEnv,session.counter)
        if (session.env) {
            const sameEnviroment = _.isEqual(currentEnv, session.env)
            if (!sameEnviroment) {
                throw new Error("SECURITY ISSUE, not same envirioment")
            }
        }
        // store the actual enviroment in session
        session.env = currentEnv;
    })
})