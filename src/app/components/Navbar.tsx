'use client';

import Link from 'next/link';
import Image from "next/image";
import { useRouter } from "next/navigation";
import logoimg from "../../../public/images/REBTemp.png"

import { MdNotificationsActive } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";


const Navbar = () => {
    const router = useRouter();
  return (
    <div className=" fixed w-full bg-primary text-headline z-10 shadow-sm px-4">
        <div className="">
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                <Image 
                    onClick={() =>router.push('/')}
                    src={logoimg}
                    alt="Logo"
                    className="md:block cursor-pointer w-20 h-16"
                    priority
                />
                <div className='flex flex-row items-center gap-2 border-4 p-2 m-2 rounded-lg border-headline'>
                    <input className='focus:outline-none text-headline text-center' type="search" name="" id="" placeholder='Search Food' />
                    <FaSearch className='text-headline hover:text-highlight' size={24} />
                </div>
                <nav className="flex justify-between items-center" >
                    <ul className="flex space-x-4" >
                        <li><Link href="/">Add recipe</Link></li>
                        <li><Link href="/recipes">
                            <MdNotificationsActive className='text-headline' size={24} />
                        </Link></li>
                        <li><Link href="/about">
                            <IoPersonCircle className='text-highlight' size={24} />
                        </Link></li>
                    </ul>
                </nav>
            </div>
            
        </div>
    </div>
    
  );
}

export default Navbar;