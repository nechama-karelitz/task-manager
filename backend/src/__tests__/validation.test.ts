import {
  validateCategoryData,
  validateObjectId,
  validateTaskData,
} from "../utils/validation";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { TASK_STATUSES } from "../constants/statusCodes";
import { ValidationResult } from "../types/validation.types";
import mongoose from "mongoose";

describe("Validations", () => {
  describe("Task Validation", () => {
    test("should fail if title is missing for new task", () => {
      const result: ValidationResult = validateTaskData({}, false);
      expect(result.valid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.TITLE_IS_REQUIRED);
    });

    test("should pass if title is missing for update", () => {
      const result: ValidationResult = validateTaskData({}, true);
      expect(result.valid).toBe(true);
    });

    test("should fail if title is empty string for new task", () => {
      const result: ValidationResult = validateTaskData({ title: "" }, false);
      expect(result.valid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.TITLE_IS_REQUIRED);
    });

    test("should fail if description exceeds 500 characters", () => {
      const longDescription = "A".repeat(501);
      const result: ValidationResult = validateTaskData({
        title: "Task",
        description: longDescription,
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.DESCRIPTION_TOO_LONG);
    });

    test("should pass if description is exactly 500 characters", () => {
      const validDescription = "A".repeat(500);
      const result: ValidationResult = validateTaskData({
        title: "Task",
        description: validDescription,
      });
      expect(result.valid).toBe(true);
    });

    test("should fail for invalid status", () => {
      const result: ValidationResult = validateTaskData({
        title: "Task",
        status: "NotARealStatus" as unknown as TASK_STATUSES,
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.INVALID_STATUS_VALUE);
    });

    test("should pass for valid status", () => {
      const result: ValidationResult = validateTaskData({
        title: "Task",
        status: TASK_STATUSES.PENDING,
      });
      expect(result.valid).toBe(true);
    });

    test("should fail for invalid dueDate format", () => {
      const result: ValidationResult = validateTaskData({
        title: "Task",
        dueDate: new Date("not-a-date"),
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.INVALID_DUE_DATE);
    });

    test("should pass for valid dueDate format", () => {
      const result: ValidationResult = validateTaskData({
        title: "Task",
        dueDate: new Date("2025-12-31"),
      });
      expect(result.valid).toBe(true);
    });

    test("should fail for empty category ID", () => {
      const result: ValidationResult = validateTaskData({
        title: "Task",
        category: "",
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.INVALID_DUE_DATE);
    });

    test("should pass for valid category ID", () => {
      const result: ValidationResult = validateTaskData({
        title: "Task",
        category: "65f5b2e4c0a5f9a7b3e9d4c2",
      });
      expect(result.valid).toBe(true);
    });

    test("should pass for valid task with all fields", () => {
      const result: ValidationResult = validateTaskData({
        title: "Valid Task",
        description: "Valid description",
        status: TASK_STATUSES.PENDING,
        dueDate: new Date("2025-12-31"),
        category: "65f5b2e4c0a5f9a7b3e9d4c2",
      });
      expect(result.valid).toBe(true);
    });
  });

  describe("Category Validation", () => {
    test("should pass for valid category", () => {
      const result = validateCategoryData({
        name: "Work",
        description: "Tasks related to work",
      });
      expect(result.valid).toBe(true);
    });

    test("should fail for missing category name", () => {
      const result = validateCategoryData({
        description: "Tasks related to work",
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.TITLE_IS_REQUIRED);
    });

    test("should fail for empty category name", () => {
      const result = validateCategoryData({
        name: "  ",
        description: "Tasks related to work",
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.TITLE_IS_REQUIRED);
    });

    test("should fail for too long description", () => {
      const longDescription = "A".repeat(501);
      const result = validateCategoryData({
        name: "Work",
        description: longDescription,
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.DESCRIPTION_TOO_LONG);
    });
  });

  describe("Object ID Validation", () => {
    test("should pass for a valid ObjectId", () => {
      const validId = new mongoose.Types.ObjectId().toString();
      expect(validateObjectId(validId)).toBe(true);
    });

    test("should fail for an invalid ObjectId", () => {
      expect(validateObjectId("invalid-id")).toBe(false);
    });

    test("should fail for an empty string", () => {
      expect(validateObjectId("")).toBe(false);
    });

    test("should fail for a number instead of string", () => {
      expect(validateObjectId("123456789")).toBe(false);
    });
  });
});
