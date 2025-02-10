import { Request, RequestHandler, Response } from "express";
import * as CategoryService from "../services/category.service"
import { validateCategoryData } from "../utils/validation";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { ICategory } from "../types/category.types";
import { ValidationResult } from "../types/validation.types";

// Get all categories
export const getAllCategories: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const categories: ICategory[] = await CategoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: ERROR_MESSAGES.ERROR_RETRIEVING_CATEGORIES });
    }
};

// Create a new category
export const createCategory: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation: ValidationResult = validateCategoryData(req.body);
        if (!validation.valid) {
            res.status(400).json({ message: validation.error });
            return;
        }

        const categoryAlreadyExists: boolean = await CategoryService.categoryExists(req.body.name);
        if (categoryAlreadyExists) {
            res.status(400).json({ message: ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS });
            return;
        }

        const category: ICategory = await CategoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: ERROR_MESSAGES.ERROR_CREATING_CATEGORY });
    }
};
