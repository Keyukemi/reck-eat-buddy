'use client'
import { SafeUser, safeRecipe } from "@/app/types";
import { Recipe, ingredient } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface recipeCardProps{
    data: safeRecipe;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser: SafeUser | null;
    info?: ingredient

}

const RecipeCard: React.FC <recipeCardProps> = ({
    data, onAction, disabled, actionId ="", actionLabel, currentUser,info
}) => {
    const router = useRouter();

    const handleCancel = useCallback(
        (e: React.MouseEvent <HTMLButtonElement>) =>{
            e.stopPropagation();
            if (disabled){
                return;
            }
            onAction?.(actionId);
        },[disabled, onAction, actionId])
    return ( 
        <div onClick={() => router.push(`/recipes/${data.id}`)}
        className="col-span-1 cursor-pointer group "
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square rounded-xl w-full relative overflow-hidden">  
                    <Image
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        fill 
                        alt="Recipe"
                        src={data.imageUrl}
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            recipeId = {data.id}
                            currentUser = {currentUser}
                        />
                    </div>
                </div>
                <div className="font-light text-neutral-500">
                    {data.category}
                    {/* This should be changed to display the cuisine or food category */}
                </div>
                {/* <div className="font-light text-neutral-500">
                    {info.allergies}
                </div> */}
                <div className="flex flex-row items-center gap-1">
                    <div className="font font-semibold">
                        {data.name}
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default RecipeCard;