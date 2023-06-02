'use client'

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import qs from "query-string";
import Heading from "../Heading";
import Counter from "../inputs/Counter";

enum STEPS{
    MEALNAME =0,
    MEALTYPE = 1,
    ALLERGIES = 2

}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [step, setStep] = useState(STEPS.MEALNAME);
    const [mealName, setMealName] = useState();
    const [mealCoverage, setMealCoverage] = useState(1);
    const [allergies, setAllergies] =useState();
    const [category, setCategory] = useState();
    
    const onBack = useCallback(()=> {
        setStep((value) => value-1)
    },[]);

    const onNext = useCallback(()=> {
        setStep((value) => value + 1)
    },[]);

    const onSubmit = useCallback( async ()=> {
        if (step !== STEPS.ALLERGIES){
            return onNext()
        }

        let currentQuery = {};
        if (params){
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery:any = {
            ...currentQuery,
            mealName,
            mealCoverage
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
            
        }, {skipNull:true})
        setStep(STEPS.MEALNAME)
        searchModal.onClose();
        router.push(url);
    },[step, params, mealName, mealCoverage, searchModal, router, onNext]);

    const actionLabel = useMemo (()=>{
        if (step == STEPS.ALLERGIES){
            return 'Search';
        }
        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if (step == STEPS.MEALNAME){
            return undefined
        }
        return 'Back'
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="What do you want to cook"
                subtitle="Search for recipe by name"
            />
            <hr />
            <Counter
                title="Meal Quantity"
                subtitle="Meal for how many people"
                value={mealCoverage}
                onChange={(value) => setMealCoverage(value)}
            />
            {/* 1. Create a search box that pulls all the names of the meals from data base
                2. the names display as a dropdown 
                3. there should be a not found response if the recipe doesn't exist
                4. There should be an onchange for value once a recipe name is selected
                5. The meal names should be displayed in alphabetical order
                6. the input shouldn't be "required" so its not forced to input a name  
            */}
        </div>
    )

    if (step == STEPS.MEALTYPE){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading 
                title="Filter by recipe category"
                subtitle="What kind of cuisine is it?"
                />
                {/* 1. create a drop down that maps over categories in categorybox
                    2. This should be an option if filtering by name doesn't work
                
                */}

            </div>
        )
    }

    if (step == STEPS.ALLERGIES){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading 
                title="Filter recipes by allergies"
                subtitle="Got some allergies?"
                />
                {/* 1. create a drop down that maps over categories in categorybox
                    2. This should be an option if filtering by name doesn't work
                
                */}
            </div>
        )
    }




    return ( 
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            body={bodyContent}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.MEALNAME ? undefined: onBack}
        />
     );
}
 
export default SearchModal;