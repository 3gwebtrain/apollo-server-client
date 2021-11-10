import express from "express";
import mongoose from "mongoose";
import cors from "cors";


import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";


// const db = mangoose.connection;

async function startServer() {
    const app = express();
    app.use(cors());
    // dotenv.config();
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });
    app.use((req, res) => res.send("Server started successfully"));

    const port = process.env.PORT || 5000;
    console.log('process.env.mongodb', process.env);
    await mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");
    console.log('connected');

    let db = mongoose.connection;
    db.on('error', () => {
        console.error("Error while connecting to DB");
    });
    app.listen(port, () => console.log(`app running on ${port} `));
}

startServer();