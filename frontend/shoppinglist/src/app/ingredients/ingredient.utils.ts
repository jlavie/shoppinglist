export enum IngredientCategory {
    VEGETABLE = 'Légume',
    STARCH = 'Féculent',
    FRUIT = 'Fruit',
    MEAT = 'Viande'
}

export interface IIngredientCategoryProperties {
	imageUrl: string;
	color: string;
}

export const MonsterTypeProperties: {[key: string]: IIngredientCategoryProperties} = {
	[IngredientCategory.VEGETABLE]: {
		imageUrl: 'assets/img/vegetable.png',
		color: 'rgb(135, 255, 124)'
	},
	[IngredientCategory.STARCH]: {
		imageUrl: 'assets/img/starch.png',
		color: 'rgb(255, 255, 104)'
	},
	[IngredientCategory.MEAT]: {
		imageUrl: 'assets/img/meat.png',
		color: 'rgb(255, 104, 104)'
	},
}