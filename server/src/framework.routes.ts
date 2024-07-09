import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

//express router to serve frameworks
export const frameworkRouter = express.Router();
frameworkRouter.use(express.json());

//first route to get endpoint to get frameworks  that exist in frameworks collection
frameworkRouter.get("/", async (_req, res) => {
    try {
        // ? chaining properties together in case it is not defined. will throw an error if it is not 
        const framework = await collections?.Framework?.find({}).toArray();
        res.status(200).send(framework);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

//2nd Endpoint to look up framework from specific Assignee Email
frameworkRouter.get("/:Assignee_email", async (req, res) => {
    try {
        const email = req?.params?.Assignee_email;
        const query = { Assignee_email: email };
        const framework = await collections?.Framework?.find(query).toArray();

        if (framework) {
            res.status(200).send(framework);
        } else {
            res.status(404).send(`Failed to find any frameworks..`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an employee: Email ${req?.params?.Assignee_email}`);
    }
});

//Endpoint to save a new Framework

frameworkRouter.post("/", async (req, res) => {
    try {
        const framework = req.body;
        const result = await collections?.Framework?.insertOne(framework);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new Framework: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new Framework.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

//Endpoint to Update a Framework in our Framework DB
frameworkRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const framework = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.Framework?.updateOne(query, { $set: framework });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated the framework with: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find any framework with: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update Framework with: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

//endpoint to delete a Framework
frameworkRouter.delete("/:id", async (req, res) => {
    try {
                //identify with id param
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.Framework?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed Framework: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove framework: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find framework: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});