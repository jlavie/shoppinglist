export interface Ingredient {
    _id: string;
    name: string;
    file: File;
    category: string;
    unit?: string;
}