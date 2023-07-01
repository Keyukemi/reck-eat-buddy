import prismadb from '@/app/libs/prismadb';

import getCurrentUser from './getCurrentUser';

export default async function getFavRecipes(){
    try {
        // const currentUser = await getCurrentUser();
        // if (!currentUser){
        //     return [];
        // }
        // const favorites = await prismadb.user.findMany({
        //     where:{
        //         id:{
        //             in:[...(currentUser.favoriteIds || [])]
        //         }
        //     }
        // });
        // const safeFavorites = favorites.map((favorite) =>({
        //     ...favorite,
        //     createdAt:favorite.createdAt.toISOString(),
        //     deletedAt:favorite.deletedAt.toISOString(),
        //     updatedAt:favorite.updatedAt.toISOString(),

        // }));
        return ['girl', 'boy']
    } catch (error: any) {
        throw new Error (error)
    }
}