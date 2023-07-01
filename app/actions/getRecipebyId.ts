import db from '@/app/libs/prismadb'

interface IParams{
    recipeId?: string
}

export default async function getRecipebyId(
    params: IParams
){
    try {
        const {recipeId} = params;
        const recipe = await prismadb.recipe.findUnique({
            where: {
                id: recipeId
            },
            include:{
                user: true
            }
        });

        if (!recipe){
            return null
        }
        return{
            ...recipe,
            createdAt: recipe.createdAt.toISOString(),
            updatedAt: recipe.updatedAt.toISOString(),
            deletedAt: recipe.deletedAt.toISOString(),
            user: {
                ...recipe.user,
                createdAt: recipe.user.createdAt.toISOString(),
                updatedAt: recipe.user.updatedAt.toISOString(),
                deletedAt: recipe.user.deletedAt.toISOString(),
                emailVerified: recipe.user.emailVerified?.toISOString() || null,
            }
        };
    } catch (error:any) {
        throw new Error(error);
    }
}