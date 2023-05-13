'use client'

import  Container from "../Container";
import {MdOutlineSoupKitchen} from "react-icons/md"
import {BiDrink} from "react-icons/bi"
import {FaGlobeAsia, FaGlobeAfrica} from "react-icons/fa"
import {GiIndianPalace, GiNoodles,GiHotSpices} from "react-icons/gi"
import {MdFastfood, MdEmojiFoodBeverage, MdBreakfastDining} from "react-icons/md"
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";


export const categories =[
    
    {
        label: "Asian",
        icon: FaGlobeAsia,
        description:"Asian Food"
    },
    {
        label: "Indian",
        icon: GiIndianPalace,
        description:"Indigeneous Indian Food"
    },
    {
        label: "African",
        icon: FaGlobeAfrica,
        description:"Food from all over Africa"
    },
    {
        label: "FastFood",
        icon: MdFastfood,
        description:"Quick and Food"
    },
    {
        label: "Brunch",
        icon: MdBreakfastDining,
        description:"Food for breakfast or Brunch"
    },
    {
        label: "Soups",
        icon: MdOutlineSoupKitchen,
        description:"Soups from around the world"
    },
    {
        label: "Noodles",
        icon: GiNoodles,
        description:"All the noodles in the world"
    },
    {
        label: "Spicy",
        icon: GiHotSpices,
        description:"All the noodles in the world"
    },
    {
        label: "Drinks",
        icon: BiDrink,
        description:"Drinks from the world"
    },
    {
        label: "Beverages",
        icon: MdEmojiFoodBeverage,
        description:"Hot and cold beverages from the world"
    },


]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname =='/';
    if (!isMainPage){
        return null
    }

    return (
       <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item)=>(
                    <CategoryBox 
                        key={item.label}
                        label ={item.label}
                        icon={item.icon}
                        selected = {category==item.label}

                    />
                ))}
            </div>
       </Container>
      );
}
 
export default Categories; 