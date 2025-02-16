export enum IngredientCategory {
    FRUIT = 'Fruit',
    VEGETABLE = 'Légume',
    STARCH = 'Féculent',
    MEAT = 'Viande',
	FISH = 'Poisson',
	BREAD = 'Pain',
	FROMAGE = 'Fromage',
	SAUCE = 'Sauce',
	EGG = 'Oeuf',
	MILK = 'Produits laitiers',
	SEED = 'Graines',
	CEREAL = 'Cereales',
	SPICES = 'Epices',
	OIL = 'Huile',
	CONDIMENT = 'Condiments',
	DRINK = 'Boissons'

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