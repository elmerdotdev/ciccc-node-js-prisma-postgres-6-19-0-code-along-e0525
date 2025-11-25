"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = __importDefault(require("../controllers/todo.controller"));
const todoRouter = (0, express_1.Router)();
todoRouter.get('/', todo_controller_1.default.getAllTodos);
todoRouter.get('/:id', todo_controller_1.default.getTodoById);
todoRouter.post('/', todo_controller_1.default.addTodo);
todoRouter.put('/:id', todo_controller_1.default.updateTodoById);
todoRouter.delete('/:id', todo_controller_1.default.deleteTodoById);
exports.default = todoRouter;
