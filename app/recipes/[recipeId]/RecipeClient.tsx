'use client'

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import RecipeHead from "@/app/components/recipes/RecipeHead";
import { SafeUser, safeRecipe } from "@/app/types";
import { useMemo } from "react";

interface RecipeClientProps{
    recipe: safeRecipe & {
        user: SafeUser
    }
    currentUser?: SafeUser | null;
}

const RecipeClient: React.FC <RecipeClientProps> = ({
    recipe,currentUser
}) => {
    const cuisineCategory = useMemo(()=>{
    return categories.find((item) => item.label == recipe.category )

    },[recipe.category]);

    return (
        <div>
            <Container>
                <div className="max-w-screen-lg mx-auto ">
                    <div className="flex flex-col gap-6">
                        <RecipeHead
                            title = {recipe.name}
                            imageUrl = {recipe.imageUrl}
                            mealCost = {recipe.costEstimate}
                            id = {recipe.id}
                            currentUser = {currentUser}
                        />
                    </div>

                </div>
            </Container>

            
        </div>
    );
}
 
export default RecipeClient;