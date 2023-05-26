import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';

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
        cuisine,
        imageUrl,
        name,
        foodClass,
        category,
        cookTime,
        prepTime,
        mealCoverage,
        instructions,
        measurmentUnit,
        measurmentQty,
        ingredients,
        allergies
    } = body

    const createdIngredients = await prisma.ingredient.create({
        data: {
            allergies,
            measurmentQty,
            measurmentUnit,
            name: ingredients,
        }
    })


    const recipe = await prisma.recipe.create({
            data: {
            imageUrl,
            name,
            foodClass,
            category,
            cookTime,
            prepTime,
            mealCoverage,
            user: {
                connect: {
                    id: currentUser.id,
                }
            },
            cuisine: {
                create: {
                    name: cuisine
                },  
            },
            instructions: {
                create: {
                    description: instructions
                }
            },
            ingredients: {
                connect: {
                    id: createdIngredients.id,
                }
            },
        }
    });
    return NextResponse.json(recipe);
};
