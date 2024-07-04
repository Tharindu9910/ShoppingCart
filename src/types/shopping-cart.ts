export type Item = {
    id: string;
    name: string;
    price: number;
  }
export type CartItem = Item & {count: number;}