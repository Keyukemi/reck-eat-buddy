import { Recipe, User, ingredient, allergy } from "@prisma/client";

export type safeRecipe = Omit<
Recipe,
"createdAt" | "updatedAt" | "deletedAt"
> & {
createdAt: string;
updatedAt: string;
deletedAt: string;

}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified" | "deletedAt"
> & {
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    emailVerified: string | null ;

}

export type SafeIngredients = Omit<
    ingredient,
    "createdAt" | "updatedAt"  | "deletedAt"
> & {
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export type safeAllergy = Omit<
allergy,
"createdAt" | "updatedAt" | "deletedAt"
> & {
createdAt: string;
updatedAt: string;
deletedAt: string;

}