'use client'

import Image from "next/image";

import { SafeUser } from "@/app/types"
import Heading from "../Heading";
import HeartButton from "../HeartButton";

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
        <>
            <Heading
                title={title}
                //subtitle = {``} use this to add the food origin country
            />
            <div className="w-full h-[60vh] relative overflow-hidden rounded-xl">
                <Image
                    alt="image"
                    src={imageUrl}
                    fill
                    className="w-full object-cover"
                />
            <div className="absolute top-5 right-5">
                <HeartButton
                    recipeId={id}
                    currentUser={currentUser}
                />
            </div>
            </div>
        </>
    );
}
 
export default RecipeHead;