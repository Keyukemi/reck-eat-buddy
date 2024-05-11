import Image from "next/image";
import cake from "../../../public/food_images/cake.png"

const RecipeCard = ({
}) => {
    return ( 
        <div
        className="col-span-1 cursor-pointer group "
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square rounded-xl w-full relative overflow-hidden">  
                    <Image
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        fill 
                        alt="Recipe"
                        src={cake}
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        {/* <HeartButton
                            recipeId = {data.id}
                            currentUser = {currentUser}
                        /> */}
                    </div>
                </div>
                <div className="font-light text-neutral-500">
                    <p>Pastry</p>
                    {}
                    {/* This should be changed to display the cuisine or food category */}
                </div>
                <div className="font-light text-neutral-500">
                    {}
                    Flour
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font font-semibold">
                        {}
                        Cake
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default RecipeCard;