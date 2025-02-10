import { Request, Response, RequestHandler } from "express";
import * as TaskService from "../services/task.service";
import * as CategoryService from "../services/category.service";
import { validateTaskData } from "../utils/validation";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { ITask } from "../types/task.types";
import { ValidationResult } from "../types/validation.types";

// Get all tasks
export const getAllTasks: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
  try {
    const { category, status } = req.query;
    const filter: Partial<ITask> = {};

    if (category) filter.category = category as string;
    if (status) filter.status = status as ITask["status"];

    const tasks: ITask[] = await TaskService.getTasks(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.FAILED_TO_FETCH_TASKS });
  }
};

// Create a new task
export const createTask: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation: ValidationResult = validateTaskData(req.body);
    if (!validation.valid) {
      res.status(400).json({ error: validation.error });
      return;
    }
    if(req.body.category && !await CategoryService.validateCategoryExists(req.body.category)) {
      res.status(400).json({ error: ERROR_MESSAGES.INVALID_CATEGORY });
      return;
    }

    const task: ITask = await TaskService.createTask(req.body);

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.FAILED_TO_CREATE_TASK });
  }
};

// Update a task
export const updateTask: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const validation = validateTaskData(req.body, true);
    if (!validation.valid) {
        res.status(400).json({ error: validation.error });
        return;
    }
    if(req.body.category && !await CategoryService.validateCategoryExists(req.body.category)) {
      res.status(400).json({ error: ERROR_MESSAGES.INVALID_CATEGORY });
      return;
    }

    const updatedTask: ITask | null = await TaskService.updateTask(id, req.body);

    if (!updatedTask) {
      res.status(404).json({ message: ERROR_MESSAGES.TASK_NOT_FOUND });
      return;
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.FAILED_TO_UPDATE_TASK });
  }
};

// Delete a task
export const deleteTask: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTask: ITask | null = await TaskService.deleteTask(id);
    if (!deletedTask) {
      res.status(404).json({ message: ERROR_MESSAGES.TASK_NOT_FOUND });
      return;
    }

    res.json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.FAILED_TO_DELETE_TASK });
  }
};
