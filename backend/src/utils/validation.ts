import { ERROR_MESSAGES } from "../constants/errorMessages";
import { TASK_STATUSES } from "../constants/statusCodes";
import { ITask } from "../types/task.types";
import { ValidationResult } from "../types/validation.types";
import mongoose from "mongoose";

// Validate task data
export const validateTaskData = (taskData: Partial<ITask>, isUpdate: boolean = false): ValidationResult => {
    if (!isUpdate) { // Only check required fields if this is a new task
        if (!taskData.title || taskData.title.trim() === "") {
            return { valid: false, error: ERROR_MESSAGES.TITLE_IS_REQUIRED };
        }
    }

    if (taskData.description && taskData.description.length > 500) {
        return { valid: false, error: ERROR_MESSAGES.DESCRIPTION_TOO_LONG };
    }

    if (taskData.status !== undefined && !Object.values(TASK_STATUSES).includes(taskData.status)) {
        return { valid: false, error: ERROR_MESSAGES.INVALID_STATUS_VALUE };
    }

    if (taskData.dueDate !== undefined && taskData.dueDate && isNaN(Date.parse(taskData.dueDate.toString()))) {
        return { valid: false, error: ERROR_MESSAGES.INVALID_DUE_DATE };
    }

    if (taskData.category !== undefined && taskData.category.toString().trim() === "") {
        return { valid: false, error: ERROR_MESSAGES.INVALID_DUE_DATE };
    }

    return { valid: true };
};

// Validate category data
export const validateCategoryData = (categoryData: any): ValidationResult => {
    const {name, description} = categoryData;

    if (!name || name.trim() === "") {
        return { valid: false, error: ERROR_MESSAGES.TITLE_IS_REQUIRED };
    }
    if (description && description.length > 500) {
        return { valid: false, error: ERROR_MESSAGES.DESCRIPTION_TOO_LONG };
    }

    return { valid: true };
}

// Validate object ID
export const validateObjectId = (id: string): boolean => {
    return mongoose.Types.ObjectId.isValid(id);
};