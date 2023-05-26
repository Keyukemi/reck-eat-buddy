// import Image from 'next/image'

import getCurrentUser from "./actions/getCurrentUser";
import getRecipes from "./actions/getRecipes";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import RecipeCard from "./components/recipes/RecipeCard";


export default async function Home() {
  const recipes = await getRecipes();
  const currentUser = await getCurrentUser();


  if (recipes.length == 0){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
          {recipes.map((recipe: any) =>{
            return(
              <RecipeCard 
               currentUser ={currentUser}
               key={recipe.id}
               data = {recipe}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}
 