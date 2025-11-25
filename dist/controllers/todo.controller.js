"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_model_1 = __importDefault(require("../models/todo.model"));
// Get all todos
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_model_1.default.fetchAll();
        res.status(200).json(todos);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Get todo by id
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const todo = yield todo_model_1.default.fetchById(id);
        if (!todo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        res.status(200).json(todo);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Add todo
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task, completed, userId } = req.body;
    try {
        const newTodo = yield todo_model_1.default.create({
            task,
            completed,
            userId
        });
        res.status(201).json(newTodo);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Update todo by id
const updateTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { task, completed } = req.body;
    try {
        const updatedTodo = yield todo_model_1.default.editById(id, {
            task,
            completed
        });
        if (!updatedTodo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        res.status(200).json(updatedTodo);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Delete todo by id
const deleteTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const deletedTodo = yield todo_model_1.default.deleteById(id);
        res.status(200).json(deletedTodo);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getAllTodos,
    getTodoById,
    addTodo,
    updateTodoById,
    deleteTodoById
};
