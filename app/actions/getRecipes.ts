import prisma from "@/app/libs/prismadb"

export default async function getRecipes (){
    try{
        const recipes = await prisma.recipe.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return recipes;
    }
    catch(error: any){
        throw new Error (error)
    }
}