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
import Input, {BaseInput} from "../inputs/Input";
import Counter from "../inputs/Counter";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {AiOutlineFieldTime, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Button from "../Button";
import { BiTimer } from "react-icons/bi";
import { MdOutlinePriceChange } from "react-icons/md";


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
        name: '',
    }]);
    
    
    const manageAddedIngredientInputs = () => {
        const newField = {id:ingredientInputs.length +1,  
            measurmentQty: '',
            measurmentUnit: '',
            name: '',
        }
        manageIngredientsInputs([...ingredientInputs, newField])
    }

    const onDeleteIngredientInput = (index: any) => {
    
        if (ingredientInputs.length === 1){
            return 
        }
        const values = ingredientInputs.filter((field)=> field.id !== index)
        manageIngredientsInputs(values)
    }

    const updateIngredients = (id:number, updatedData: "measurmentQty"|"measurmentUnit"|"name", data: string) =>{
        const ingredients = ingredientInputs.map(ingredient => {
            if (ingredient.id === id){
                ingredient[updatedData] = data
            }
            return ingredient;
        })
        manageIngredientsInputs(ingredients)
    }



    //b. Cooking-Steps Input State
    const [instructionInputs, manageInstructionInputs] = useState(['']);


    const addNewInstruction = () =>{
        manageInstructionInputs((instructions)=> {
            return [...instructions, '']
        })
    }

    const onDeleteInstructionInput = (index: any) => {
    
        if (instructionInputs.length === 1){
        return 
        }
        const values = [...instructionInputs]
        values.splice(index, 1)
        manageInstructionInputs(values)
    }


    const updateInstructions = (index:number, value:string) => {
        manageInstructionInputs((instructions)=>{
            const temp = [...instructions]
            temp[index] = value
            return [...temp]
        })
    }




    //c. Allergies Input State
    const [allergyInputs, manageAllergyInputs] = useState(['']);

    const addNewAllergy = () =>{
        manageAllergyInputs((instructions)=> {
            return [...instructions, '']
        })
    }

    const onDeleteAllergyInput = (index: any) => {
    
        if (allergyInputs.length === 1){
        return 
        }
        const values = [...allergyInputs]
        values.splice(index, 1)
        manageAllergyInputs(values)
    }

    const updateAllergies = (index:number, value:string) => {
        manageAllergyInputs((allergies)=>{
            const temp = [...allergies]
            temp[index] = value
            return [...temp]
        })
    }


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
            imageUrl: '',
            name: '',
            foodClass:'',
            mealCoverage:0,
            costEstimate:'',
            category:'',
            cookTime:'',
            prepTime:'',
            instructions: [],
            ingredients: [],
            allergies:[],
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
        const recipeData = {
            ...data,
            mealCoverage: `${data.mealCoverage}`, 
            ingredients: ingredientInputs.map((ingredient)=>{
                return {
                    ...ingredient,
                    id: `${ingredient.id}`
                }
            }),
            instructions: instructionInputs,
            allergies: allergyInputs
        }
        console.log(recipeData)
        axios.post('/api/recipes', {...recipeData})
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
                    onChange={(value)=> setCustomValue('mealCoverage',  value)}
                />
    
                <Input
                        id="costEstimate"
                        label="Estimated Cost"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        type="number"
                        required 
                        
                        prefix={()=>{
                            return <MdOutlinePriceChange size={20} className="text-neutral-700 absolute top-5 left-2" />
                        }}
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
                        <BaseInput 
                            onChange= {(event: any) => updateIngredients(field.id, "name", event.target.value)}
                            label="Add Ingredient"
                            required
                            id="name"
                            value={field.name}
                        />

                        <BaseInput
                        id="measurmentQty"
                        label="How much"
                        disabled={isLoading}
                        type="number"
                        min="0"
                        value={field.measurmentQty}
                        onChange= {(event: any) => updateIngredients(field.id, "measurmentQty", event.target.value)}
                        />
                        <div className="w-full relative">
                            <label htmlFor="measurmentUnit" id="measurmentUnit" 
                            className="block mb-2 text-sm font-medium text-headline"
                            > Select measurement</label>
                            <select
                             id="measurmentUnit"  value={field.measurmentUnit}
                             className="bg-primary border-2 border-headline
                              text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                onChange= {(event: any) => updateIngredients(field.id, "measurmentUnit", event.target.value)}
                                >
                                {Object.values(MeasurementUnits).map((unit) => <option key={unit}>{unit}</option>)}
                            </select>
                        </div>

                        <button onClick={()=> (onDeleteIngredientInput(field.id))}
                             className="w-40 h-10 transition cursor-pointer flex justify-center items-center rounded-full
                             text-primary border-paragraph hover:opacity-80 border-[3px] bg-headline ">
                                <AiOutlineMinus size={20}/>
                        </button> 
                    </div> 
                ))}
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
                            prefix={()=>{
                                return <AiOutlineFieldTime size={20} className="text-neutral-700 absolute top-5 left-2" />
                            }}
                        /> 

                        <Input
                            id="cookTime"
                            label="Cook Time"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            prefix={()=>{
                                return <BiTimer size={20} className="text-neutral-700 absolute top-5 left-2" />
                            }}
                        /> 
                </div>
                <hr />

               
                {instructionInputs.map((value, index) => (
                    <div key={index} className="flex flex-row gap-8">
                        <BaseInput 
                            id="instructions"
                            label="Cooking Steps"
                            required
                            value={value}
                            onChange= {(event: any) => updateInstructions(index, event.target.value)}
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
                        onClick={addNewInstruction}
                        label="Add more Cooking Steps"
                        icon={AiOutlinePlus}
                    />      
                </div>
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

                               
                {allergyInputs.map((value, index) => (
                    <div key={index} className="flex flex-row gap-8">
                        <BaseInput 
                            id="allergies"
                            label="Allergens in Recipe"
                            required
                            onChange= {(event: any) => updateAllergies(index, event.target.value)}
                            value={value}
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
                        onClick={addNewAllergy}
                        label="Add more Cooking Steps"
                        icon={AiOutlinePlus}
                    />      
                </div> 
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