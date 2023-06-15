import {create} from "zustand";

interface addRecipeStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

const addRecipeModal = create <addRecipeStore> ((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));

export default addRecipeModal;