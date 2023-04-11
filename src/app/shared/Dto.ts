import { savedRecipesDTO } from "../saved-recipes/savedRecipesDTO";

export interface Area{
    strArea: String
}

export interface Ingredient{
    idIngredient:number,
    strIngredient: string,
    strDescription: string,
    strType: string,
}

export interface Category{
    strCategory:String
}

export interface SpoonText{
    text:string;
}


export class User{
    userId:number;
    email:string;
    password:string;
    savedRecipes:savedRecipesDTO[];
}
