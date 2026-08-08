export type Unit =
  | 'pieces' | 'kg' | 'g' | 'liters' | 'ml'
  | 'cups' | 'tbsp' | 'tsp' | 'dozen';

export type Category =
  | 'Vegetables' | 'Fruits' | 'Meat' | 'Dairy' | 'Grains'
  | 'Spices' | 'Beverages' | 'Frozen' | 'Canned' | 'Other';

export type Location = 'Fridge' | 'Freezer' | 'Pantry' | 'Counter' | 'Cupboard';

export interface Inventory {
  readonly id: string;        
  readonly inventoryId: string;  
  readonly userId?: string | null;
  readonly ingredientName: string;
  readonly quantity: number;
  readonly unit: Unit;
  readonly category: Category;
  readonly purchaseDate: string;   
  readonly expirationDate: string;
  readonly location: Location;
  readonly cost: number;         
  readonly createdDate: string; 
}

export function createInventory(
  id: string,
  inventoryId: string,
  userId: string | null,
  ingredientName: string,
  quantity: number,
  unit: Unit,
  category: Category,
  purchaseDate: string,
  expirationDate: string,
  location: Location,
  cost: number,
  createdDate: string
): Inventory {
  return {
    id,
    inventoryId,
    userId,
    ingredientName,
    quantity,
    unit,
    category,
    purchaseDate,
    expirationDate,
    location,
    cost,
    createdDate
  };
}
