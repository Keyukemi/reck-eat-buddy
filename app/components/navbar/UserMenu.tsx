'use client'

import {AiOutlineMenu} from "react-icons/ai"; 
import Profile from "../Profile";
import { useCallback, useState } from "react";
import MenuList from "./MenuList";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";


interface UserMenuProps {
    currentUser?: User | null; 
}

const UserMenu:React.FC <UserMenuProps> = ({
    currentUser
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] =useState(false);

    const toggleOpen = useCallback(()=> {
        setIsOpen((value) => !value)
    }, []);

    return (  
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={()=>{}} className="md-block text-sm font-semibold 
                rounded-full py-3 px-4 transition cursor-pointer hover:bg-neutral-100">
                    Add Your Recipe
                </div>
                <div  onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200
                flex flex-row items-center gap-3 rounded-full cursor-pointer transition hover:shadow-md">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Profile />
                    </div>
                </div>
            </div>
            {isOpen &&(
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4
                 bg-primary overflow-hidden right-0 top-12 text-sm m-1">

                    <div className="flex flex-col cursor-pointer ">
                        {currentUser ? (
                            <>
                            
                            <MenuList onClick={()=>{}}label="My meals" />
                            <MenuList onClick={()=>{}} label="Favorite meals" />
                            <MenuList onClick={()=>{}}label="My Food Timetable" />

                            <hr />
                            <MenuList onClick={()=>signOut()}label="Logout" />
                        </>


                        ): (
                            <>
                                <MenuList onClick={loginModal.onOpen} label="Login" />
                                <MenuList onClick={registerModal.onOpen}label="Sign Up" />
                            </>

                        )}
                    </div>

                </div>
            ) }
        </div>
    ); 
}
 
export default UserMenu;