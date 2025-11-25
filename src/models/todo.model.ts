import { PrismaClient, Todo } from "../generated/prisma/client";

const prisma = new PrismaClient()

// Get all todos
const fetchAll = async () => {
  return await prisma.todo.findMany({
    include: {
      user: true
    }
  })
}

// Get todo by id
const fetchById = async (id: number) => {
  return await prisma.todo.findUnique({
    where: { id },
    include: {
      user: true
    }
  })
}

// Create todo
const create = async (data: Omit<Todo, 'id'>) => {
  return await prisma.todo.create({ data })
}

// Update todo by id
const editById = async (id: number, data: Partial<Todo>) => {
  return await prisma.todo.update({
    where: { id },
    data
  })
}

// Delete todo by id
const deleteById = async (id: number) => {
  return await prisma.todo.delete({
    where: { id }
  })
}

export default {
  fetchAll,
  fetchById,
  create,
  editById,
  deleteById
}