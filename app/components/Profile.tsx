'use client';
import Image from "next/image";
import AvatarPlace from "../../public/REB_Images/avatar.png"

interface ProfileImgProps{
    src: string | null | undefined;
};

const Profile: React.FC<ProfileImgProps> = ({
    src
}) => {
    return ( 
        <div>
            <Image 
                src={src || AvatarPlace}
                alt="Avatar"
                width="30"
                height="30"
                className="rounded-full"
            />
        </div>
     );
}
 
export default Profile;