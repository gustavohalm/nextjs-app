import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if(req.method === 'GET'){
        const savings = await prisma.saving.findMany({
            include: {
                user: true
            }
        });
        res.json(savings);
  }
}