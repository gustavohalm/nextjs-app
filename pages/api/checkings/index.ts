import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if(req.method === 'GET'){
    // Handle any other HTTP method
        const checkings = await prisma.checking.findMany({
            include: {
                user: true
            }
        });
        res.json(checkings);
  }
}