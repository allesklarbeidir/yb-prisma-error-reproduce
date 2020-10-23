import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async (done) => {

    for(let i = 0; i < 100; i++){
        
        await Promise.all([1,2,3,4,5,6,7,8,9,10].map(async j => {

            // INSERT KeyValuePair

            const kvp = await prisma.keyValuePair.create({
                data: {
                    name: `${i}-test-${j}`,
                    description: `${i}-some-description-${j}`
                }
            });

            // INSERT ReferenceKeyValuePair with nested connect (Lookup if exists in a TRANSACTION before inserting)

            const refKvp = await prisma.referenceKeyValuePair.create({
                data: {
                    kvp: {
                        connect: {
                            name: kvp.name
                        }
                    },
                    someId: `${i}-someid-${j}`
                }
            });

            // SELECT ReferenceKeyValuePair

            const selectedRefKvp = await prisma.referenceKeyValuePair.findOne({
                where: {
                    kvpId_someId: {
                        kvpId: kvp.name,
                        someId: refKvp.someId
                    }
                }
            });

            // DELETE ReferenceKeyValuePair first

            await prisma.referenceKeyValuePair.delete({
                where: {
                    kvpId_someId: {
                        kvpId: selectedRefKvp.kvpId,
                        someId: selectedRefKvp.someId
                    }
                }
            });

            // DELETE KeyValuePair

            await prisma.keyValuePair.delete({
                where: {
                    name: kvp.name
                }
            });


        }));

        // Send a SELECT command to identify the for-loop runs in the database logs

        await prisma.keyValuePair.findOne({
            where: {
                name: `SPLIT---${i}---SPLIT`
            }
        });
        console.log(`Completed ${i*10} runs.`);

    }


    done()

})(() => {
    process.exit(0);
});
