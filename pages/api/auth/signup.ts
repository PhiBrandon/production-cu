import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { hash } from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';

type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    if(req.method === 'POST'){
        const {email, password, name} = req.body
        if(!email || !email.includes('@') || !password) {
            res.status(422).json({message: 'Invalid Data'})
            return;
        }
        const prisma = new PrismaClient()
        // Check if email exists
        const user = await prisma.users.findMany({
            where: {
                email: email,
            },
        })

        if(user[0]){
          res.status(422).json({message: 'User already exists'})
        }

        //Hash password
        console.log(password)
        const status = await prisma.users.create({
          data: {
            email: email,
            name: name,
            password: await hash(password, 12),
          }
        })

        //Send success response
        res.status(201).json({message: 'User created', ...status})
        prisma.$disconnect()

    } else {
      res.status(500).json({message: 'Route not valid'})
    }
}