import { Request, Response } from 'express'
import { User } from '../generated/prisma/client'
import userModel from '../models/user.model'

// Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.fetchAll()
    res.status(200).json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Get user by id
const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id)
  try {
    const user = await userModel.fetchById(id)
    if (!user) {
      res.status(404).json({ message: "User not found" })
      return
    }
    res.status(200).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Add user
const addUser = async (req: Request<{}, Omit<User, 'id'>>, res: Response) => {
  const { firstname, lastname, age, username, email } = req.body
  try {
    const user = await userModel.create({
      firstname,
      lastname,
      age,
      username,
      email
    })
    res.status(201).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Update user by id
const updateUserById = async (req: Request<{ id: string }, Partial<User>>, res: Response) => {
  const id = Number(req.params.id)
  const { firstname, lastname, age, username, email } = req.body
  try {
    const updatedUser = await userModel.editById(id, {
      firstname,
      lastname,
      age,
      username,
      email
    })
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" })
      return
    }
    res.status(200).json(updatedUser)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete user by id
const deleteUserById = async (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id)
  try {
    const deletedUser = await userModel.deleteById(id)
    res.status(200).json(deletedUser)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

export default {
  getAllUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById
}