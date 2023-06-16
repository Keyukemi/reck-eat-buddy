'use client'

import { InputHTMLAttributes } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface BaseInputProps{
    prefix?: () => React.ReactNode;
    error?: string;
    label: string;
}
type InputProps = {
    id: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    value?: any;
    onChange?: (value: string) => void;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
} & BaseInputProps


const Input: React.FC<InputProps> = ({
    id, label, type = "text", disabled, required, register, errors, prefix, value, onChange
}) => {
    return (
        <div className="w-full relative">
            {
                prefix && (
                    prefix()
                )
            }


            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=""
                type={type}
                className={`peer w-full p-4 pt-6 font-light bg-primary border-2
                rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
                ${prefix ? 'pl-9' : 'pl-4'} 
                ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
            `}
            />
            <label className={`absolute text-md duration-150 transform top-5 z-10 -translate-y-3 origin-[0]
                ${prefix ? 'left-9' : 'left-4'} 
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
                `}>
                {label}
            </label>
        </div>
    );
}

export const BaseInput = (props: InputHTMLAttributes<HTMLInputElement> & BaseInputProps) => {
    return (
        <div  className="w-full relative">
            <input
                {...props}
                className={`peer w-full p-4 pt-6 font-light text-sm bg-primary border-2
                rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
                ${props.prefix? 'pl-9' : 'pl-4'} 
                ${props.error? 'border-rose-500' : 'border-neutral-300'}
                ${props.error? 'focus:border-rose-500' : 'focus:border-black'}
            `}
            />
            <label className={`absolute text-sm duration-150 transform top-5 z-10 -translate-y-3 origin-[0]
                ${props.prefix ? 'left-9' : 'left-4'} 
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                ${props.error? 'text-rose-500' : 'text-zinc-400'}
                `}>
                {props.label}
            </label>
        </div>
    )
}

export default Input;