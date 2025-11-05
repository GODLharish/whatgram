import express from 'express';
import dotenv from'dotenv';
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const __dirname = path.resolve();

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
})
}


app.listen(PORT, () => {
  console.log('Server is running on port 3000');
  console.log('raja babu, how are you,');
});