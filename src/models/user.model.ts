import { PrismaClient, User } from "../generated/prisma/client";

const prisma = new PrismaClient()

// Fetch all users
const fetchAll = async () => {
  return await prisma.user.findMany({
    include: {
      todos: true
    }
  })
}

// Fetch user by id
const fetchById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      todos: true
    }
  })
}

// Create user
const create = async (data: Omit<User, 'id'>) => {
  return await prisma.user.create({ data })
}

// Edit user by id
const editById = async (id: number, data: Partial<User>) => {
  return await prisma.user.update({
    where: { id },
    data
  })
}

// Delete user by id
const deleteById = async (id: number) => {
  return await prisma.user.delete({
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