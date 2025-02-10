import { Task } from "../models/task.model";
import { ITask } from "../types/task.types";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { validateObjectId } from "../utils/validation";

// Create a new task
export const createTask = async (taskData: Partial<ITask>): Promise<ITask> => {
    const task = new Task(taskData);
    const savedTask = await task.save();
    return savedTask.toObject() as ITask;
};

// Get all tasks with optional filters
export const getTasks = async (filter: Partial<ITask>): Promise<ITask[]> => {
    return await Task.find(filter).populate("category", "name").lean();
};

// update a task by id
export const updateTask = async (id: string, taskData: Partial<ITask>): Promise<ITask | null> => {
    if (!validateObjectId(id)) {
        throw new Error(ERROR_MESSAGES.INVALID_TASK_ID);
    }

    const updatedTask = await Task.findByIdAndUpdate(id, taskData, { new: true, lean: true });
    
    if (!updatedTask) {
        throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND);
    }

    return updatedTask as ITask;
};

// Delete a task by id
export const deleteTask = async (id: string): Promise<ITask | null> => {
    if (!validateObjectId(id)) {
        throw new Error(ERROR_MESSAGES.INVALID_TASK_ID);
    }

    const deletedTask = await Task.findByIdAndDelete(id).lean();

    if (!deletedTask) {
        throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND);
    }

    return deletedTask as ITask;
};