import { Dish } from "../dishes/dish.model";

export interface WeeklyMenu {
    _id: string;
    date: string; 
    dishes: {
        moment: string;
        type: string;
        dish: Dish
    }[];
    userId: string;
}