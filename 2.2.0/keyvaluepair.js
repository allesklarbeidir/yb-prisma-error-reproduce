import { objectType, extendType, inputObjectType, enumType } from "@nexus/schema";

import { PrismaClient } from "@prisma/client";
const SQL = new PrismaClient();

const RegisterKeyValuePairInput = inputObjectType({
    name: "RegisterKeyValuePairInput",
    definition(t){
        t.string("name", {required: true});
        t.string("description");
    }
});
const RegisterKeyValuePairPayload = objectType({
    name: "RegisterKeyValuePairPayload",
    definition(t){
        t.field("keyvaluepair", {
            type: "KeyValuePair"
        });
    }
});

const Mutation = extendType({
    type: "Mutation",
    definition(t){
        t.field("registerKeyValuePair", {
            type: RegisterKeyValuePairPayload,
            args: {
                input: RegisterKeyValuePairInput
            },
            async resolve(parent, {input:{name, description}}, ctx, info){
                return {
                    keyvaluepair: await SQL.keyValuePair.upsert({
                        update: {},
                        where: {
                            name
                        },
                        create: {
                            name,
                            description
                        }
                    })
                };
            }
        })
    }
});

const KeyValuePair = objectType({
    name: "KeyValuePair",
    definition(t){
        t.model.name();
        t.model.description();
    }
});

export default [Mutation, KeyValuePair];