import { PrismaClient } from "@prisma/client";

import { server } from "./graphqlserver";
import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server";

(async () => {

    await server.listen(3000);

    const client = createTestClient(server);

    const {data: fiveIsOkdata, errors: fiveHasNoErrors} = await client.mutate({
        mutation: gql`
            mutation {
                res1: registerKeyValuePair(input: {
                    name: "ok1",
                    description: "description"
                }){ keyvaluepair { name } }
                res2: registerKeyValuePair(input: {
                    name: "ok2",
                    description: "description"
                }){ keyvaluepair { name } }
                res3: registerKeyValuePair(input: {
                    name: "ok3",
                    description: "description"
                }){ keyvaluepair { name } }
                res4: registerKeyValuePair(input: {
                    name: "ok4",
                    description: "description"
                }){ keyvaluepair { name } }
                res5: registerKeyValuePair(input: {
                    name: "ok5",
                    description: "description"
                }){ keyvaluepair { name } }
            }
        `
    });

    console.log(JSON.stringify(fiveIsOkdata, null, 4));
    console.log(JSON.stringify(fiveHasNoErrors, null, 4));

    const {data, errors} = await client.mutate({
        mutation: gql`
            mutation {
                res1: registerKeyValuePair(input: {
                    name: "fail1",
                    description: "description"
                }){ keyvaluepair { name } }
                res2: registerKeyValuePair(input: {
                    name: "fail2",
                    description: "description"
                }){ keyvaluepair { name } }
                res3: registerKeyValuePair(input: {
                    name: "fail3",
                    description: "description"
                }){ keyvaluepair { name } }
                res4: registerKeyValuePair(input: {
                    name: "fail4",
                    description: "description"
                }){ keyvaluepair { name } }
                res5: registerKeyValuePair(input: {
                    name: "fail5",
                    description: "description"
                }){ keyvaluepair { name } }

                res6: registerKeyValuePair(input: {
                    name: "fail6",
                    description: "description"
                }){ keyvaluepair { name } }
            }
        `
    });

    console.log(JSON.stringify(data, null, 4));
    console.log(JSON.stringify(errors, null, 4));


    const prisma = new PrismaClient();

    const res5 = await Promise.all([1,2,3,4,5].map(i => prisma.keyValuePair.upsert({
        update: {},
        where: {
            name: `test_${i}`
        },
        create: {
            name: `test_${i}`,
            description: `description_${i}`
        }
    })));
    console.log(res5);
    
    const fail6 = await Promise.all([1,2,3,4,5,6].map(i => prisma.keyValuePair.upsert({
        update: {},
        where: {
            name: `test_${i}`
        },
        create: {
            name: `test_${i}`,
            description: `description_${i}`
        }
    })));
    console.log(fail6);

})();
