import mongoose from "mongoose";

export interface ICategoryBase {
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Full category including _id
export interface ICategory extends ICategoryBase {
    _id: mongoose.Types.ObjectId;
}
