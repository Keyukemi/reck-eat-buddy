'use client'

import { SafeUser } from "@/app/types"
import { IconType } from "react-icons"
import Profile from "../Profile";
import RecipeCategory from "./RecipeCategory";

interface RecipeInfoProps{
    user: SafeUser;
    preptime: string | null;
    cookTime: string | null;
    mealCoverage: string;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
}

const RecipeInfo: React.FC <RecipeInfoProps> = ({
    user, category, preptime, cookTime, mealCoverage
}) => {
    return (
        <div className="flex flex-col col-span-4 gap-8">
            <div className="gap-2 flex flex-col">
                <div className="flex flex-row text-lg font-semibold items-center gap-2">
                    <div>Created by {user.name} </div>
                    <Profile src={user?.image}/>
                </div>
                <div className="flex flex-row font-light items-center gap-4 text-neutral-500">
                    <div>Meal Quantity: <span className="font-bold">{mealCoverage} People</span></div>
                    <div>Prep Time: <span className="font-bold">{preptime} </span> </div>
                    <div>Cook Time: <span className="font-bold">{cookTime} </span></div>
                </div>
            </div>
            <hr />
            {category &&
                <RecipeCategory 
                    icon = {category.icon}
                    label = {category.label}
                    description = {category.description}
                />
            }
            <hr />
        </div>
      );
}
 
export default RecipeInfo;