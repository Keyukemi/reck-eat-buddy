import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";


// implement a transaction so that if one fails, all fails and doesnt get sent to the database

export default async function handler (req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).end();
    }
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser){
            return res.status(422).json({error: 'No such user'});
        }
        const{ ingredients, allergies,...recipeItems} = req.body
        
        
        const recipe = await prismadb.recipe.create({
            data: {
                ...recipeItems,
                ingredients:{
                    create: ingredients
                },
                allergies: {
                    create: allergies
                },
                user: {
                    connect: {
                        id: currentUser.id
                    }
                },
                
            }
            
        });  
        return res.status(200).json(recipe);

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
    
}


