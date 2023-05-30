import prisma from "@/app/libs/prismadb"

export default async function getRecipes(){
    try{
        const recipes = await prisma.recipe.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });


        const safeRecipes = recipes.map((recipe)=> ({
            ...recipe,
            createdAt: recipe.createdAt.toISOString(),
            updatedAt: recipe.updatedAt.toISOString(),
            deletedAt: recipe.deletedAt.toISOString(),
        }));
        return safeRecipes;
    }
    catch(error: any){
        throw new Error (error)
    }
}