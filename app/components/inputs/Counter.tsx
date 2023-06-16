'use client'

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title?: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC <CounterProps> = ({
    title, subtitle, value, onChange
}) => {
    const onAdd = useCallback (() => {
        onChange(1 + value);
    },[onChange, value]);

    const onSubtract = useCallback (() => {
        if (value == 0){
            return;
        }
        onChange(value - 1);
    },[onChange, value]);

    return ( 
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row gap-4 items-center"> 
                <div onClick={onSubtract} 
                    className="w-10 h-10 transition cursor-pointer flex justify-center items-center rounded-full
                    text-neutral-600 border-neutral-400 hover:opacity-80 border-[1px]"> <AiOutlineMinus/>
                </div>
                <div className="text-light text-neutral-600 text-xl">
                    {value}
                </div>
                <div onClick={onAdd} 
                    className="w-10 h-10 transition cursor-pointer flex justify-center items-center rounded-full
                    text-neutral-600 border-neutral-400 hover:opacity-80 border-[1px]"> <AiOutlinePlus/>
                </div>
            </div>
        </div>
     );
}
 
export default Counter;