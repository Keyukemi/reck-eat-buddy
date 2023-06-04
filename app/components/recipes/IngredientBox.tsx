'use client'
import { SafeIngredients, SafeUser, safeRecipe } from "@/app/types"


interface IngredientBoxProps{
    ingredients: SafeIngredients | null
}

const IngredientBox: React.FC <IngredientBoxProps> = ({
    ingredients
}) => {
    return ( 
        <div>
            List Ingredients here 
            {ingredients?.name}
        </div>
     );

}

 
export default IngredientBox;