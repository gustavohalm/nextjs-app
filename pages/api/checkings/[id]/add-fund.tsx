import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if(req.method === 'PUT'){
        const checkingId = parseInt(req.query.id.toString())
        const {fund} = req.body;
        const checking = await prisma.checking.findUnique({
            where: {
                id: checkingId
            }
        });
        const checkingUpdated = await prisma.checking.update({
            where:{
                id: checkingId
            },
            data: {
                fund: fund+checking.fund
            }
        })
        
        res.json(checkingUpdated);
  }else{
    res.status(404)
  }
}