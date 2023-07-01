import {create} from "zustand";

interface useRecipeStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

const useRecipeModal = create <useRecipeStore> ((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));

export default useRecipeModal;