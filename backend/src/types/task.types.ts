import mongoose from "mongoose";
import { TASK_STATUSES } from "../constants/statusCodes";

export interface ITaskBase {
    title: string;
    description?: string;
    category?: mongoose.Types.ObjectId | string; 
    status: typeof TASK_STATUSES[keyof typeof TASK_STATUSES];
    dueDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

// Full task including _id
export interface ITask extends ITaskBase {
    _id: mongoose.Types.ObjectId;
}
