'use client'

import addRecipeModal from "@/app/hooks/addRecipeModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {DevTool} from "@hookform/devtools"

import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Counter from "../inputs/Counter";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Button from "../Button";


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
    
    //a. Ingredients Input State
    const [ingredientInputs, manageIngredientsInputs] = useState([{
        id: 1,
        measurmentQty: '',
        measurmentUnit: '',
        ingredients: '',
    }]);
    

    const manageAddedIngredientInputs = () => {
        const newField = {id:ingredientInputs.length +1,  
            measurmentQty: '',
            measurmentUnit: '',
            ingredients: '',
        }
        manageIngredientsInputs([...ingredientInputs, newField])
    }

    const onDeleteIngredientInput = (index: any) => {
    
        if (ingredientInputs.length === 1){
            return 
        }

        // const values = [...ingredientInputs]
        // values.splice(index, 1)
        const values = ingredientInputs.filter((field)=> field.id !== index)
        manageIngredientsInputs(values)
    }


    const manageIngredientInputChange = (index:any, value:any) => {
        // const updatedInputs = [...ingredientInputs]
        // updatedInputs[index] = value
        const updatedInputs = ingredientInputs.map((field) => {
            if(field.id === index){
                return {
                    ...field,
                    measurmentQty: value.target.measurmentQty,
                    measurmentUnit: value.target.measurmentUnit,
                    ingredients: value.target.ingredients,
                }
            }
            return field
        })
        manageIngredientsInputs(updatedInputs)
    }


    //b. Cooking-Steps Input State
    // const [instructionInputs, manageInstructionInputs] = useState(['']);

    // const manageAddedInstructionInputs = () => {
    //     manageInstructionInputs([...instructionInputs,''])
    // }

    // const onDeleteInstructionInput = (index: any) => {
    
    //     if (instructionInputs.length === 1){
    //     return 
    //     }
    //     const values = [...instructionInputs]
    //     values.splice(index, 1)
    //     manageInstructionInputs(values)
    // }


    // const manageInstructionInputChange = (index:any, value:any) => {
    //     const updatedInputs = [...instructionInputs]
    //     updatedInputs[index] = value
    //     manageInstructionInputs(updatedInputs)
    // }



    //c. Allergies Input Statei
    // const [allergyInputs, manageAllergyInputs] = useState(['']);

    // const manageAddedAllergyInputs = () => {
    //     manageAllergyInputs([...allergyInputs,''])
    // }

    // const onDeleteAllergyInput = (index: any) => {
    
    //     if (allergyInputs.length === 1){
    //     return 
    //     }
    //     const values = [...allergyInputs]
    //     values.splice(index, 1)
    //     manageAllergyInputs(values)
    // }


    // const manageAllergyInputChange = (index:any, value:any) => {
    //     const updatedInputs = [...allergyInputs]
    //     updatedInputs[index] = value
    //     manageAllergyInputs(updatedInputs)
    // }

    
  

    const { control,
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
            instructions: [],
            measurmentQty: '',
            measurmentUnit: '',
            ingredients: '',
            allergies:[],
        }
    });

    const category = watch('category');
    const imageUrl = watch('imageUrl');
    const mealCoverage = watch('mealCoverage');
    //const [mealCoverage, setMealCoverage] = useState(1);

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
        console.log(data)
        // axios.post('/api/recipes', { ...data, allergies: [data.allergies]})
        // .then(() =>{
        //     toast.success('Recipe Created!');
        //     router.refresh();
        //     reset();
        //     setStep(STEPS.CUISINE);
        //     addRecipe.onClose;
        // })

        // .catch (()=>{
        //     toast.error('Something went wrong!');
        // })
        // .finally(()=>{
        //     setIsLoading(false);
        // })
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

                <div className="flex flex-col gap-8 ">
                    <Button 
                        onClick={manageAddedIngredientInputs}
                        label="Add more Ingredients"
                        icon={AiOutlinePlus}
                    />      
                </div>

                {ingredientInputs.map((field) => (
                    <div key={field.id} className="flex flex-row gap-8">
                        <Input 
                            id="ingredients"
                            label="Add Ingredient"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            value={field.ingredients}
                            onChange= {(event: any) => manageIngredientInputChange(field.id, event)}
                        />
                        <Input
                        id="measurmentQty"
                        label="How much"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        type="number"
                        value={field.measurmentQty}
                            
                        />
                        {/* <label id="measurmentUnit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Select an option</label> */}
                        <select id="measurmentUnit" 
                            onSelect={(selected) => setCustomValue('measurmentUnit', selected.currentTarget.value)}
                            value={field.measurmentUnit}
                            className="border-headline border-2 text-lg rounded-lg block w-full p-3 ">
                            {Object.values(MeasurementUnits).map((unit) => <option key={unit}>{unit}</option>)}
                        </select>

                        <button onClick={()=> (onDeleteIngredientInput(field.id))}
                             className="w-40 h-10 transition cursor-pointer flex justify-center items-center rounded-full
                             text-primary border-paragraph hover:opacity-80 border-[3px] bg-headline ">
                                <AiOutlineMinus size={20}/>
                        </button> 
                    </div> 
                ))}


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
                <div className="flex flex-row items-center justify-evenly gap-2">
                        <Input
                            id="prepTime"
                            label="Prep Time"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            prepTime
                        /> 

                        <Input
                            id="cookTime"
                            label="Cook Time"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            cookTime
                        /> 
                </div>
                <hr />

               
                {/* {instructionInputs.map((value, index) => (
                    <div key={value} className="flex flex-row gap-8">
                        <Input 
                            id="instructions"
                            label="Cooking Steps"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            value={value}
                            onChange= {(event: any) => manageInstructionInputChange(index, event)}
                        />

                        <button onClick={()=> (onDeleteInstructionInput(index))}
                             className="w-10 h-10 transition cursor-pointer flex justify-center items-center rounded-full
                             text-primary border-paragraph hover:opacity-80 border-[3px] bg-headline ">
                                <AiOutlineMinus size={20}/>
                        </button> 
                    </div> 
                ))}

                <div className="flex flex-col gap-8 ">
                    <Button 
                        onClick={manageAddedInstructionInputs}
                        label="Add more Cooking Steps"
                        icon={AiOutlinePlus}
                    />      
                </div> */}
            </div>
        )
    }

    if (step == STEPS.ALLERGIES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Allergies and Intolerances"
                    subtitle="Please input items that might trigger an allergic reaction"
                />

                               
                {/* {allergyInputs.map((value, index) => (
                    <div key={value} className="flex flex-row gap-8">
                        <Input 
                            id="allergies"
                            label="Allergens in Recipe"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            value={value}
                            onChange= {(event: any) => manageAllergyInputChange(index, event)}
                        />

                        <button onClick={()=> (onDeleteAllergyInput(index))}
                             className="w-10 h-10 transition cursor-pointer flex justify-center items-center rounded-full
                             text-primary border-paragraph hover:opacity-80 border-[3px] bg-headline ">
                                <AiOutlineMinus size={20}/>
                        </button> 
                    </div> 
                ))}

                <div className="flex flex-col gap-8 ">
                    <Button 
                        onClick={manageAddedAllergyInputs}
                        label="Add more Cooking Steps"
                        icon={AiOutlinePlus}
                    />      
                </div>  */}
            </div>
        )
    }
    <DevTool control={control}/>



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