'use client'

import  Container from "../Container";
import {MdOutlineSoupKitchen} from "react-icons/md"
import {BiCookie} from "react-icons/bi"
import {FaGlobeAfrica} from "react-icons/fa"
import {GiIndianPalace, GiNoodles,GiHotSpices, GiMeat, GiDumplingBao, GiFishCooked, GiCroissant, GiSushis, GiFullPizza} from "react-icons/gi"
import {MdBreakfastDining } from "react-icons/md"
import {TbSalad} from "react-icons/tb"

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";


export const categories =[
    
    {
        label: "Japanese",
        icon: GiSushis,
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
        label: "French",
        icon: GiCroissant,
        description:"French Food from all over Africa"
    },
    {
        label: "Chinese",
        icon: GiDumplingBao,
        description:"Meals from China"
    },
    
    {
        label: "Italian",
        icon: GiFullPizza,
        description:"Quick and easy Food"
    },
    {
        label: "English",
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
        label: "Beef",
        icon: GiMeat,
        description:"Beef"
    },
    {
        label: "Fish",
        icon: GiFishCooked,
        description:"Hot and cold beverages from the world"
    },
    {
        label: "Pastries",
        icon: BiCookie,
        description:"Yummy pastries around the world"
    },
    {
        label: "Salads",
        icon: TbSalad,
        description:"Yummy Salads around the world"
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