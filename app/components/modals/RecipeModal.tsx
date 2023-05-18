'use client'

import addRecipeModal from "@/app/hooks/addRecipeModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

enum STEPS{
    CUISINE = 0,
    INFO = 1,
    IMAGES = 2,
    INGREDIENTS =3,
    INSTRUCTION = 4,
    ALLERGIES = 5
}

const RecipeModal = () => {
    const addRecipe = addRecipeModal();

    const [step, setStep] = useState(STEPS.CUISINE);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            cuisine: "",
            imageUrl: '',
            title: '',
            instruction: '',
            measurmentUnit: '',
            measurmentQty: 0,
            description:'',
            ingredient: ''
        }
    });

    const cuisine = watch('cuisine');

    const setCustomValue = (id:string, value:any) =>{
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep ((value) => value -1);
    };

    const onNext = () => {
        setStep ((value) => value +1);
    };

    const actionLabel = useMemo(() => {
        if (step == STEPS.ALLERGIES){
            return 'Create';
        }
        return 'Next';
    },[step])

    const secondaryActionLabel = useMemo(() =>{
        if (step == STEPS.CUISINE){
            return undefined;
        }
        return 'Back'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your recipe"
                subtitle="Select Cuisine Category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick = {(cuisine) => setCustomValue('cuisine', cuisine)}
                            selected = {cuisine == item.label}
                            label = {item.label}
                            icon = {item.icon}
                        
                        />
                    </div>
                ))}
            </div>
        </div>
    )
    
    return ( 
        <Modal
            isOpen = {addRecipe.isOpen}
            onClose= {addRecipe.onClose}
            onSubmit={addRecipe.onClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.CUISINE ? undefined : onBack}
            title="Add a Recipe"
            body={bodyContent}
        />
     );
}
 
export default RecipeModal;