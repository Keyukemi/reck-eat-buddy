import prisma from "@/app/libs/prismadb"

export interface IRecipesParams{
    userId?: string;
    category?: string;
    mealCoverage?: number;

}

export default async function getRecipes(
    //params: IRecipesParams
){
    try{
        // const {userId, category, mealCoverage} = params;
        // let query: any = {}

        // if (userId){
        //     query.userId = userId
        // }

        //  if (category){
        //     query.category = category
        // }

        // if (mealCoverage){
        //     query.mealCoverage = {
        //         gte: +mealCoverage
        //     }
        // }


        const recipes = await prisma.recipe.findMany({
            //where:query, 
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