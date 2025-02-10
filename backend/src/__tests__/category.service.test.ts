import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Category } from "../models/category.model";
import { 
    getAllCategories, 
    categoryExists, 
    createCategory, 
    validateCategoryExists 
} from "../services/category.service";
import { ICategory } from "../types/category.types";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
    await Category.deleteMany(); // Clean DB between tests
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe("Category Service", () => {

    describe("getAllCategories", () => {
        test("should return all categories", async () => {
            await Category.create([
                { name: "Work", description: "Work tasks" },
                { name: "Personal", description: "Personal tasks" },
            ]);
    
            const categories = (await getAllCategories()).sort((a, b) => a.name.localeCompare(b.name));
    
            expect(categories.length).toBe(2);
            expect(categories[0]).toHaveProperty("_id");
            expect(categories[0].name).toBe("Personal");
            expect(categories[1].name).toBe("Work");
        });
    
        test("should return an empty array if no categories exist", async () => {
            const categories = await getAllCategories();
            expect(categories).toEqual([]);
        });
    });
    

    describe("categoryExists", () => {
        test("should return true if category exists", async () => {
            await Category.create({ name: "Fitness", description: "Workout tasks" });

            const exists = await categoryExists("Fitness");
            expect(exists).toBe(true);
        });

        test("should return false if category does not exist", async () => {
            const exists = await categoryExists("NonExistentCategory");
            expect(exists).toBe(false);
        });
    });

    describe("createCategory", () => {
        test("should create a new category", async () => {
            const categoryData: Partial<ICategory> = {
                name: "Gaming",
                description: "Gaming related tasks",
            };

            const result = await createCategory(categoryData);
            expect(result).toMatchObject(categoryData);

            const categories = await getAllCategories();
            expect(categories.length).toBe(1);
            expect(categories[0].name).toBe("Gaming");
        });

        test("should not create duplicate category names", async () => {
            await createCategory({ name: "Duplicate", description: "Test" });

            await expect(createCategory({ name: "Duplicate", description: "Test again" }))
                .rejects.toThrow();
        });
    });

    describe("validateCategoryExists", () => {
        test("should return true if category ID is valid", async () => {
            const category = await createCategory({ name: "Health", description: "Health tasks" });

            const isValid = await validateCategoryExists(category._id.toString());
            expect(isValid).toBe(true);
        });

        test("should return true if no category ID is provided", async () => {
            const isValid = await validateCategoryExists("");
            expect(isValid).toBe(true);
        });

        test("should return false if category ID does not exist", async () => {
            const fakeId = new mongoose.Types.ObjectId().toString();

            const isValid = await validateCategoryExists(fakeId);
            expect(isValid).toBe(false);
        });
    });

});
