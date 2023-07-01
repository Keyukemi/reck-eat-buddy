import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";


interface IParams {
    recipeId?: string;
}

//adding a favorite
export async function POST (
    request: Request,
    {params}: {params: IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const {recipeId} = params;
    if(!recipeId || typeof recipeId !== 'string'){
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [] )];

    favoriteIds.push(recipeId);

    const user = await prismadb.user.update({
        where: {
            id: currentUser.id
        },
        data:{
            favoriteIds
        }
    });
    return NextResponse.json(user);
}

//Deleting a Favorite
export async function DELETE(
    request: Request,
    {params}: {params: IParams}
){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    const {recipeId} = params;
    if(!recipeId || typeof recipeId !== 'string'){
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [] )];

    favoriteIds = favoriteIds.filter((id) => id !== recipeId);

    const user = await prismadb.user.update({
        where: {
            id: currentUser.id
        },
        data:{
            favoriteIds
        }
    });

    return NextResponse.json(user);
}
