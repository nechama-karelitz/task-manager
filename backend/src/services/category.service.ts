import { Category } from "../models/category.model";
import { ICategory } from "../types/category.types";

export const getAllCategories = async (): Promise<ICategory[]> => {
    return await Category.find().lean();
};

// Check if category already exists
export const categoryExists = async (name: string): Promise<boolean> => {
    const existingCategory = await Category.findOne({ name });
    return !!existingCategory;
};

export const createCategory = async (categoryData: Partial<ICategory>): Promise<ICategory> => {
    const category = new Category(categoryData);
    return await category.save();
};

/**
 * Checks if the provided category ID exists in the database.
 * @param categoryId - The category ID to validate
 */
export const validateCategoryExists = async (categoryId: string): Promise<boolean> => {
    if (!categoryId) return true; // No category provided, valid case
    return !!(await Category.exists({ _id: categoryId }));
};
