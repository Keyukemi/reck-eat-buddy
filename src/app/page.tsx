import Categories from "./components/CategoryIcons";
import RecipeCard from "./components/RecipeCard";

export default function Home() {
  return (
    <div className="w-full min-h-screen" >
       <Categories />
      <main className="w-full flex text-center justify-center items-center " >
        <RecipeCard/>
      </main>
    </div>
  );
}
