'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import RebLogo from "../../../public/REB_Images/rebLogo3.png"

const Logo = () => {
   const router = useRouter();
   return (
     <Image 
         onClick={() =>router.push('/')}
        src={RebLogo}
        alt="Logo"
        className="hidden md:block cursor-pointer"
        width="100"
        height="100"
     />
   )
}


 
export default Logo ;