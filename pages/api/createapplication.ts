import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";




export default async function createapplication(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const client = new PrismaClient()
    const data = req.body


    //Find the userId to put in the database
    const userInformation = await client.users.findFirst({
        where: {
            email: data.email,
        }
    })
    const userId = userInformation?.id.toString()

    //Create new entry for Loan Application
    const loanApplication = await client.loanapplications.create({
      data: {
        streetaddress: data.streetaddress,
        propertytype: data.property,
        creditscore: data.creditscore,
        postalcode: data.postalcode,
        propertyuse: data.propertyuse,
        city:data.city,
        id:data.id,
        appliedat:data.appliedat,
        userid: userId,
        status: "pending",
        type: data.type,
      }
    })

    //Return the success message to the frontend
    console.log(loanApplication)
    console.log(userInformation)

    res.status(200).json({ message: 'Success' })
  }