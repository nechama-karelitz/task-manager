import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createTask, getTasks, updateTask, deleteTask } from "../services/task.service";
import { Task } from "../models/task.model";
import { ITask } from "../types/task.types";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { TASK_STATUSES } from "../constants/statusCodes";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
    await Task.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe("Task Service", () => {

    describe("createTask", () => {
        test("should create a new task", async () => {
            const taskData: Partial<ITask> = {
                title: "Test Task",
                description: "A sample task",
                status: TASK_STATUSES.PENDING,
            };

            const task = await createTask(taskData);

            expect(task).toHaveProperty("_id");
            expect(task.title).toBe("Test Task");
            expect(task.status).toBe("Pending");
        });
    });

    describe("getTasks", () => {
        test("should return all tasks", async () => {
            await Task.create([
                { title: "Task 1", description: "First task", status: "Pending" },
                { title: "Task 2", description: "Second task", status: "Completed" }
            ]);

            const tasks = await getTasks({});
            expect(tasks.length).toBe(2);
        });

        test("should return filtered tasks", async () => {
            await Task.create([
                { title: "Task 1", status: "Pending" },
                { title: "Task 2", status: "Completed" }
            ]);

            const filteredTasks = await getTasks({ status: TASK_STATUSES.PENDING });
            expect(filteredTasks.length).toBe(1);
            expect(filteredTasks[0].status).toBe("Pending");
        });
    });

    describe("updateTask", () => {
        test("should update a task", async () => {
            const task = await Task.create({
                title: "Task to update",
                description: "Old description",
                status: "Pending",
            });

            const updatedTask = await updateTask(task._id.toString(), { description: "New description" });

            expect(updatedTask).toBeDefined();
            expect(updatedTask?.description).toBe("New description");
        });

        test("should throw error for invalid ID", async () => {
            await expect(updateTask("invalidId", { status: TASK_STATUSES.COMPLETED }))
                .rejects.toThrow(ERROR_MESSAGES.INVALID_TASK_ID);
        });

        test("should throw error if task not found", async () => {
            const validId = new mongoose.Types.ObjectId().toString();
            await expect(updateTask(validId, { status: TASK_STATUSES.COMPLETED }))
                .rejects.toThrow(ERROR_MESSAGES.TASK_NOT_FOUND);
        });
    });

    describe("deleteTask", () => {
        test("should delete a task", async () => {
            const task = await Task.create({
                title: "Task to delete",
                status: "Pending",
            });

            const deletedTask = await deleteTask(task._id.toString());
            expect(deletedTask).toBeDefined();
        });

        test("should throw error for invalid ID", async () => {
            await expect(deleteTask("invalidId"))
                .rejects.toThrow(ERROR_MESSAGES.INVALID_TASK_ID);
        });

        test("should throw error if task not found", async () => {
            const validId = new mongoose.Types.ObjectId().toString();
            await expect(deleteTask(validId))
                .rejects.toThrow(ERROR_MESSAGES.TASK_NOT_FOUND);
        });
    });

});
