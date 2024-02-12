import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log('api transaction', req.body)
        const {
            typeOrigin, 
            accountOriginId,
            typeDestiny,
            accountDestinyId,
            amount
        } = req.body;
        console.log(
            'body',
            typeOrigin, 
            accountOriginId,
            typeDestiny,
            accountDestinyId,
            amount
        )
        const account = typeOrigin == 'checking' ? 
            await prisma.checking.findUnique({ where: {
                    id: accountOriginId
                }
            }) :
            await prisma.saving.findUnique({where: {
                id: accountOriginId
            }
        });
        if(account.fund >= amount){
            const accountDestiny = typeDestiny == 'checking' ? 
                await prisma.checking.findUnique({ where: {
                        id: accountDestinyId
                    }
                }) :
                await prisma.saving.findUnique({where: {
                    id: accountDestinyId
                }
            });
            const originFund = account.fund - amount;
            const destinyFund = accountDestiny.fund + amount;
            
            typeDestiny == 'checking' ? 
                await prisma.checking.update({
                    where: {
                        id: accountDestinyId
                    }, data: {
                        fund: destinyFund
                    }
                })
            : await prisma.saving.update({
                where: {
                    id: accountDestinyId
                }, data: {
                    fund: destinyFund
                }
            });
            res.status(200).send({})
            
            typeOrigin == 'checking' ? 
                await prisma.checking.update({
                    where: {
                        id: accountOriginId
                    }, data: {
                        fund: originFund
                    }
                })
            : await prisma.saving.update({
                where: {
                    id: accountOriginId
                }, data: {
                    fund: originFund
                }
            });
            res.status(200).send({})
            
            
        }else{
            res.status(400).json({'error': 'insuficient funds'})
        }
    }
}