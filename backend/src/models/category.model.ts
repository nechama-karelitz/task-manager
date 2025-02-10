import mongoose, { Schema } from "mongoose";
import { ICategoryBase } from "../types/category.types";

const categorySchema = new Schema<ICategoryBase>(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String }
    },
    { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
