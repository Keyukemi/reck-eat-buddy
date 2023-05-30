import  axios  from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite{
    recipeId: string;
    currentUser?: SafeUser | null;
}

const useFavorites = ({
    recipeId, currentUser
}: IUseFavorite) =>{
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(()=>{
        const list = currentUser?.favoriteIds || [];
        return list.includes(recipeId)
    },[recipeId, currentUser]);

    const toggleFavorite = useCallback(async(
        e: React.MouseEvent<HTMLDivElement>
    ) =>{
        e.stopPropagation()
        if(!currentUser){
            return loginModal.onOpen();
        }
        try {
            let request;
            
            if (hasFavorited){
                request = () => axios.delete(`/api/favorites/${recipeId}`);
            }else{
                request = () => axios.post(`/api/favorites/${recipeId}`);
            }

            await request();
            router.refresh();
            toast.success('success');
        } catch (error) {
            toast.error('Something went wrong')
        }
    },[currentUser, recipeId, loginModal, router, hasFavorited]);

    return {hasFavorited, toggleFavorite}
}

export default useFavorites;