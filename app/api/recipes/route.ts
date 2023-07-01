import { NextResponse } from "next/server";

import prisma,{} from '@/app/libs/prismadb';

import getCurrentUser from "@/app/actions/getCurrentUser";

// implement a transaction so that if one fails, all fails and doesnt get sent to the database

export async function POST (
    request: Request
){
    const currentUser = await getCurrentUser();
    if (!currentUser){
        return NextResponse.error()
    }
    const body = await request.json();
    const{
        ingredients,
        allergies,
        ...recipeItems
    } = body




    const recipe = await prisma.recipe.create({
            data: {
            ...recipeItems,
            user: {
                connect: {
                    id: currentUser.id
                }
            },
            ingredients:{
                create: ingredients
            },
            allergies: {
                create: allergies
            },
            //userId: currentUser.id,
            // user:{
            //     connect: currentUser.id
            // }
        }
    });
    
    return NextResponse.json(recipe);
};
