import { Request, Response } from 'express'
import todoModel from '../models/todo.model'
import { Todo } from '../generated/prisma/client'

// Get all todos
const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await todoModel.fetchAll()
    res.status(200).json(todos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Get todo by id
const getTodoById = async (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id)
  try {
    const todo = await todoModel.fetchById(id)
    if (!todo) {
      res.status(404).json({ message: "Todo not found" })
      return
    }
    res.status(200).json(todo)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Add todo
const addTodo = async (req: Request<{}, Omit<Todo, 'id'>>, res: Response) => {
  const { task, completed, userId } = req.body
  try {
    const newTodo = await todoModel.create({
      task,
      completed,
      userId
    })
    res.status(201).json(newTodo)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Update todo by id
const updateTodoById = async (req: Request<{ id: string }, Partial<Todo>>, res: Response) => {
  const id = Number(req.params.id)
  const { task, completed } = req.body
  try {
    const updatedTodo = await todoModel.editById(id, {
      task,
      completed
    })
    if (!updatedTodo) {
      res.status(404).json({ message: "Todo not found" })
      return
    }
    res.status(200).json(updatedTodo)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete todo by id
const deleteTodoById = async (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id)
  try {
    const deletedTodo = await todoModel.deleteById(id)
    res.status(200).json(deletedTodo)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

export default {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodoById,
  deleteTodoById
}