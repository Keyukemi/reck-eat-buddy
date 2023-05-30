'use client'

import { SafeUser } from "@/app/types"

interface RecipeHeadProps{
    title: string;
    imageUrl: string;
    mealCost: string | null;
    id: string;
    currentUser?: SafeUser | null;
}

const RecipeHead: React.FC<RecipeHeadProps> = ({
    title, imageUrl, mealCost, id, currentUser
}) => {
    return (  
        <div>

        </div>
    );
}
 
export default RecipeHead;