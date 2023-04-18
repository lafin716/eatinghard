interface Nutrient {
  serve: ServeSize;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  sugar: number;
  calcium: number;
  iron: number;
  vitaminA: number;
  vitaminC: number;
}

interface ServeSize {
  amount: number;
  unit: string;
}

export { Nutrient, ServeSize };
