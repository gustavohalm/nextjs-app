import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    
    const {name, email} = req.body;
    const userCreated = await prisma.user.create({
        data: {
            name,
            email
        }
    }).catch( e =>{
        console.log('error', e?.code);
        res.status(500).send({
            "error": "Error creating user"
        })
    });
    if(userCreated){
        await prisma.checking.create({
            data: {
                fund: 0,
                user: { connect: {id: userCreated.id}}
            }
        });
        await prisma.saving.create({
            data: {
                fund: 0,
                user: { connect: {id: userCreated.id}}
            }
        });
        const user = await prisma.user.findUnique({
            where: {
                id: userCreated.id
            },
            include: {
                checking: true,
                saving: true
            }
        });
    res.json(user);
    }
      } else if(req.method === 'GET'){
    // Handle any other HTTP method
        const users = await prisma.user.findMany({
            include: {
                checking: true,
                saving: true
            }
        });
        res.json(users);
  }
}