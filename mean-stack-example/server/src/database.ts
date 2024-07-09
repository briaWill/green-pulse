// import mongodb and framework interface from framework.ts
import * as mongodb from "mongodb";
import { Framework } from "./framework";

// export collections which could have name "framework"
export const collections: {
    Framework?: mongodb.Collection<Framework>;
} = {};


export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("gpulsebd");
    await applySchemaValidation(db);

    const frameworkCollection = db.collection<Framework>("Framework");
    collections.Framework = frameworkCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our framework model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            
            required: ["Framework_name", "Framework_description", "Assignee_email"],
            additionalProperties: false,
            properties: {
                _id: {},
                Framework_name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                Framework_description: {
                    bsonType: "string",
                    description: "'description' is required and is a string",
                    minLength: 5
                },
                Assignee_email: {
                    bsonType: "string",
                    description: "'email' is required and is valid email",
                    
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
   await db.command({
        collMod: "Framework",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("Framework", {validator: jsonSchema});
        }
    });
}