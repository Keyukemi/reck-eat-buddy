
import Container from "../components/Container";
import Heading from "../components/Heading";
import RecipeCard from "../components/recipes/RecipeCard";
import { SafeUser, safeRecipe } from "../types";

interface FavoriteClientsProps{
    recipes: safeRecipe[];
    currentUser: SafeUser | null;
}

const FavoriteClients: React.FC<FavoriteClientsProps> = ({
    recipes, currentUser
}) => {
    return ( 
        <Container>
            <Heading 
                title="Favorites"
                subtitle="Recipes you have liked"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {recipes.map((recipe)=>(
                        <RecipeCard
                            key={recipe.id}
                            data={recipe}
                            currentUser={currentUser}
                        />
                    ))}
            </div>
        </Container>
     );
}
 
export default FavoriteClients;