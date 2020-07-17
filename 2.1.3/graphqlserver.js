import path from "path";

import { ApolloServer } from "apollo-server";

import { makeSchema, queryType, mutationType, scalarType, extendInputType } from "@nexus/schema";
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { PrismaClient } from "@prisma/client";

import KeyValuePair from "./keyvaluepair";

const SQL = new PrismaClient();

const s = makeSchema({
    outputs: {
        schema: path.resolve("prisma/schema.graphql"),
        typegen: path.resolve("prisma/schema.d.ts"),
    },
    types: [
        queryType({
            definition(t){
                t.string("_")
            }
        }),
        mutationType({
            definition(t){
                t.string("_")
            }
        }),
        ...KeyValuePair
    ],
    plugins: [
        nexusSchemaPrisma()
    ]
});



const server = new ApolloServer({
    schema: s,

    playground: true,
    introspection: true,

    context: ({event, context}) => {

        return {
            prisma: SQL
        };

    }
});


export {server};

