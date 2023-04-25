'use client';
import Image from "next/image";
import AvatarPlace from "../../public/REB_Images/avatar.png"

const Profile = () => {
    return ( 
        <div>
            <Image 
                src={AvatarPlace}
                alt="Avatar"
                width="30"
                height="30"
                className="rounded-full"
            />
        </div>
     );
}
 
export default Profile;