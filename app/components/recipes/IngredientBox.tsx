import { SafeIngredients } from "@/app/types";

interface IngredientBoxProps {
  ingredients: SafeIngredients | null;
}

const IngredientBox: React.FC<IngredientBoxProps> = ({ ingredients }) => {
  return (
    <div>
      List Ingredients here
      {ingredients ? ingredients.name : null}
    </div>
  );
};

export default IngredientBox;
