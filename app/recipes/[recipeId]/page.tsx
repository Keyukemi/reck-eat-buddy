
import getCurrentUser from "@/app/actions/getCurrentUser";
import getRecipebyId from "@/app/actions/getRecipebyId";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import RecipeClient from "./RecipeClient";

interface IParams{
    recipeId?: string
}

const RecipePage = async ({params}: {params: IParams}) => {
    const recipe = await getRecipebyId(params);
    const currentUser = await getCurrentUser();

    if (!recipe){
        return(
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
    return ( 
        <ClientOnly>
                <RecipeClient
                    recipe ={recipe}
                    currentUser = {currentUser}
                />
        </ClientOnly>
     );
}
 
export default RecipePage;