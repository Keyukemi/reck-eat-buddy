'use client'

import addRecipeModal from "@/app/hooks/addRecipeModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Counter from "../inputs/Counter";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS{
    CUISINE = 0,
    INFO = 1,
    IMAGES = 2,
    INGREDIENTS =3,
    INSTRUCTION = 4,
    ALLERGIES = 5
}

const MeasurementUnits = {
    TEASPOON: 'Tea spoon',
    KG: 'kg',
    POUNDS: 'pounds',
    CUPS: 'cups'
} as const

const RecipeModal = () => {
    const router = useRouter()
    const addRecipe = addRecipeModal();

    const [step, setStep] = useState(STEPS.CUISINE);

    const [isLoading, setIsLoading] = useState(false);

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
            name: '',
            foodClass:'',
            mealCoverage:'',
            category:'',
            cookTime:'now',
            prepTime:'tomorrow',
            instructions: '',
            measurmentQty: '',
            measurmentUnit: '',
            ingredients: '',
            allergies:'',
        }
    });

    const cuisine = watch('cuisine');
    const imageUrl = watch('imageUrl');
    const mealCoverage = watch('mealCoverage');

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

    const onSubmit: SubmitHandler <FieldValues>= (data) => {
        if(step !== STEPS.ALLERGIES){
            return onNext();
        }
        setIsLoading(true);
        axios.post('/api/recipes', { ...data, allergies: [data.allergies]})
        .then(() =>{
            toast.success('Recipe Created!');
            router.refresh();
            reset();
            setStep(STEPS.CUISINE);
            addRecipe.onClose;
        })

        .catch (()=>{
            toast.error('Something went wrong!');
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

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
    if (step == STEPS.INFO){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Name of Recipe"
                    subtitle="Tell us more about this Meal"
                />

                <Input
                    id="name"
                    label="Meal Name"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />             
            </div>
        )
    }

    if (step == STEPS.IMAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add Images of your recipe"
                    subtitle="Upload Images here"
                />
                <ImageUpload 
                    value={imageUrl} 
                    onChange={(value)=> setCustomValue('imageUrl', value)}
                />
            </div>
        )
    }

    if (step == STEPS.INGREDIENTS){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Cooking Ingredients"
                    subtitle="Add meal ingredients here"
                />
                <Counter 
                    title="Meal Quantity"
                    subtitle="For how many people"
                    value={mealCoverage}
                    onChange={(value)=> setCustomValue('mealCoverage', value.toString())}
                />
                <hr />
                <div className="flex flex-col">
                    <select onSelect={(selected) => setCustomValue('measurmentUnit', selected.currentTarget.value)}>
                        {Object.values(MeasurementUnits).map((unit) => <option key={unit}>{unit}</option>)}
                    </select>

                    <Input
                        id="ingredients"
                        label="Add Ingredient"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        measureUnit
                    />
                </div>
                 {/* Add a functionality with a button that lets you create more input fields for ingredients, 
                 need to update fieldvalues and maybe schema too*/}
            </div>
        )
    }

    if (step == STEPS.INSTRUCTION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Prep and Cooking"
                    subtitle="Step-by-step instruction on how to make the meal"
                />
                {/* add a counter here for cooking prep time,  need to update fieldvalues and maybe schema too*/}
                <hr />
                <Input
                    id="instructions"
                    label="Recipe Steps"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                /> 
                {/* This input should be a text box or a way to create a list with numbers */}
            </div>
        )
    }

    if (step == STEPS.ALLERGIES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Allergies and Intolerances"
                    subtitle="Please choose items that might trigger an allergic reaction"
                />
                <Input
                    id="allergies"
                    label="Allergies"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />      
            </div>
        )
    }



    return ( 
        <Modal
            isOpen = {addRecipe.isOpen}
            onClose= {addRecipe.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.CUISINE ? undefined : onBack}
            title="Add a Recipe"
            body={bodyContent}
        />
     );
}
 
export default RecipeModal;