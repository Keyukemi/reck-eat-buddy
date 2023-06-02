'use client'

import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFavRecipes from "../actions/getFavRecipes";
import FavoriteClients from "./FavoriteClients";

const FavRecipePage = async() =>{
    const recipes = await getFavRecipes();
    // const currentUser = await getCurrentUser();

    if(recipes.length == 0){
    return (
        <ClientOnly>
            <EmptyState 
                title="No Favorite Recipes Found"
                subtitle="looks like you haven't picked favorites yet"
            />
        </ClientOnly>
    )
}   
// return(
//     <ClientOnly> 
//         <FavoriteClients 
//             recipes = {recipes}
//             currentUser={currentUser}
//         />
//     </ClientOnly>
// )

}

export default FavRecipePage;