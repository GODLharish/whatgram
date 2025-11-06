import express from 'express';
import dotenv from'dotenv';
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB }  from './lib/db.js';
import { ENV } from "./lib/env.js";

const __dirname = path.resolve();
const PORT = ENV.PORT || 5000;

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
})
}


app.listen(PORT, () => {
  console.log('Server is running on port 5000');
  connectDB();
});