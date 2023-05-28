'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorites from "../hooks/useFavorites";

interface HeartButtonProps{
    recipeId: string;
    currentUser?: SafeUser | null;
}

const HeartButton:React.FC <HeartButtonProps> = ({
    recipeId, currentUser
}) => {
    const {hasFavorited, toggleFavorite} = useFavorites({
        recipeId, currentUser,
    })
    return ( 
        <div onClick={toggleFavorite}
        className="relative transition hover:opacity-80 cursor-pointer"
        >
            <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]"/>
            <AiFillHeart size={24} className={hasFavorited ? 'fill-rose-600': 'fill-neutral-500/70'} />
        </div> 
    
    );
}
 
export default HeartButton;