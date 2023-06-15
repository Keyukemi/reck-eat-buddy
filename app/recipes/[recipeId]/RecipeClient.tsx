'use client'

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import IngredientBox from "@/app/components/recipes/IngredientBox";
import InstructionBox from "@/app/components/recipes/InstructionBox";
import RecipeHead from "@/app/components/recipes/RecipeHead";
import RecipeInfo from "@/app/components/recipes/RecipeInfo";
import { SafeIngredients, SafeInstructions, SafeUser, safeRecipe } from "@/app/types";
import { useMemo } from "react";

interface RecipeClientProps{
    recipe: safeRecipe & {
        user: SafeUser,
        // ingredients: SafeIngredients,
        // instructions: SafeInstructions
    }
    currentUser?: SafeUser | null;
}

const RecipeClient: React.FC <RecipeClientProps> = ({
    recipe,currentUser
}) => {
    const category = useMemo(()=>{
    return categories.find((item) => item.label == recipe.category)

    },[recipe.category]);

    return (
        <div>
            <Container>
                <div className="max-w-screen-lg mx-auto mt-24">
                    <div className="flex flex-col gap-6">
                        <RecipeHead
                            title = {recipe.name}
                            imageUrl = {recipe.imageUrl}
                            mealCost = {recipe.costEstimate}
                            id = {recipe.id}
                            currentUser = {currentUser}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                            <RecipeInfo
                                user = {recipe.user}
                                category ={category}
                                preptime = {recipe.prepTime}
                                cookTime = {recipe.cookTime}
                                mealCoverage = {recipe.mealCoverage}
                            />

                            <div className="border border-black border-3 w-full order-first mb-10 md:order-last md:col-span-3">
                                {/* <IngredientBox 
                                    ingredients = {recipe.ingredients}
                                /> */}
                            </div>
                        </div>
                    </div>
                    <div className="border border-black border-3 w-full">
                        <InstructionBox 
                            instructions= ""
                        
                        />
                    </div>

                </div>
            </Container>

            
        </div>
    );
}
 
export default RecipeClient;