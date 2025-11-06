import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connecton with DATABASE is established: ", conn.connection.host);
    }catch (error){
        console.log("Connection with DATABASE is not established");
        process.exit(1);
    }
}