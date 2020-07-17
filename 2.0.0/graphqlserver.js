import path from "path";

import { ApolloServer } from "apollo-server";

import { makeSchema, queryType, mutationType, scalarType, extendInputType } from "@nexus/schema";
import { nexusPrismaPlugin } from "nexus-prisma";
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
        nexusPrismaPlugin()
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

