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
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiTimer } from "react-icons/bi";

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

    const [inputs, manageInputs] = useState(['']);

    const manageAddedInputs = () => {
        manageInputs([...inputs,''])
    }

    const manageInputChange = (index:any, value:any) => {
        const updatedInputs = [...inputs]
        updatedInputs[index] = value
        manageInputs(updatedInputs)
    }
     
  

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
            costEstimate:'',
            category:'',
            cookTime:'',
            prepTime:'',
            instructions: '',
            measurmentQty: '',
            measurmentUnit: '',
            ingredients: '',
            allergies:'',
        }
    });

    const category = watch('category');
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
                            onClick = {(category) => setCustomValue('category', category)}
                            selected = {category == item.label}
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
                <hr />
                <div className="flex flex-row items-center justify-evenly gap-2">
                    <div className="flex flex-row gap-2">
                    <AiOutlineFieldTime size={24} />
                        <Input
                            id="prepTime"
                            label="Prep Time"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        /> 
                    </div>
                    <div className="flex flex-row gap-2">
                        <BiTimer size={24}/>
                        <Input
                            id="cookTime"
                            label="Cook Time"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        /> 
                    </div>
                </div>
               
                           
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
                <Input
                        id="costEstimate"
                        label="Estimated Cost"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        type="number"
                        required 
                        costEstimate  
                    />
                <hr />
                <div className="flex flex-row gap-8">
                    <Input
                        id="ingredients"
                        label="Add Ingredient"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />

                    <Input
                        id="measurmentQty"
                        label="How much"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        type="number"
                        
                    />
                    {/* <label id="measurmentUnit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select an option</label> */}
                    <select id="measurmentUnit" onSelect={(selected) => setCustomValue('measurmentUnit', selected.currentTarget.value)}
                    className="border-headline border-2 text-lg rounded-lg block w-full p-2.5 ">
                        {Object.values(MeasurementUnits).map((unit) => <option key={unit}>{unit}</option>)}
                    </select>
                </div>

                {/* 1. Create a state that handles each input created
                 have/render a button  with a value saying add more*/}
                {/* 2. we need a function that handles the add more functionality  */}
                {/* A function to handle change of values in the input */}
                {/* 3. Rendering the first input boxes by default */}
                
                


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
                {/* Create buttons below that generate more input boxes to be added to the descriptions array */}
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
                {/* What if this is a multi-select button? Make a list of all possible allergens and have user select as necessary */}    
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