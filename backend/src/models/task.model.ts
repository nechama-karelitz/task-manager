import mongoose, { Schema } from "mongoose";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { TASK_STATUSES } from "../constants/statusCodes";
import { ITaskBase } from "../types/task.types";

const taskSchema = new Schema<ITaskBase>(
    {
        title: { type: String, required: [true, ERROR_MESSAGES.TITLE_IS_REQUIRED], trim: true },
        description: { type: String, maxlength: [500, ERROR_MESSAGES.DESCRIPTION_TOO_LONG] },
        status: { type: String, enum: Object.values(TASK_STATUSES), default: TASK_STATUSES.PENDING },
        dueDate: { type: Date, required: false },
        category: { type: Schema.Types.ObjectId, ref: "Category", required: false }
    },
    { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
