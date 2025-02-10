import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import taskRoutes from "./routes/task.routes";
import categoryRoutes from "./routes/category.routes";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
