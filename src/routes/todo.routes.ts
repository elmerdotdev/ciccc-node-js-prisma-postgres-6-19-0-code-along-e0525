import { Router } from 'express'
import todoController from '../controllers/todo.controller'

const todoRouter = Router()

todoRouter.get('/', todoController.getAllTodos)
todoRouter.get('/:id', todoController.getTodoById)
todoRouter.post('/', todoController.addTodo)
todoRouter.put('/:id', todoController.updateTodoById)
todoRouter.delete('/:id', todoController.deleteTodoById)

export default todoRouter