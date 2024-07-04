import { StateCreator, create } from 'zustand';
import { addCartItems, fetchShoppingList } from '../api-client';
import { CartItem, Item } from '../types/shopping-cart';



export type CartSlice = {
  loading: boolean;
  error: Error | null;
  testData: Array<Item>;
  shoppingCart: Array<CartItem> ;
  total: number;
  fetchData: () => Promise<void>;
  addItemToCart: (item: Item) => void;
  removeItemFromCart: (item: Item) => void;
  getProductById:(itemId: string) => CartItem | undefined;
  incQty: (itemId: string) => void;
	decQty: (itemId: string) => void;
  setTotal: (total: number) => void;
  reset: () => void;
}
const initailState ={
  loading: false,
  error: null,
  testData: [],
  shoppingCart: [],
  total: 0,
}
export const createCartSlice : StateCreator<
CartSlice,
[['zustand/immer', never]]
>=(set,get) => ({
  ...initailState,
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchShoppingList(); // API client function
      set({ testData: data, loading: false });
    } catch (error) {
      set({ error: error, loading: false });
    }
  },
  addItemToCart: (item: Item) => {
    const cartItem: CartItem = { ...item, count: 1 };
    set((state) => ({
      shoppingCart: [...state.shoppingCart, cartItem]}));
      addCartItems(cartItem.id,cartItem.name,cartItem.price,cartItem.count);
    },
    
  removeItemFromCart: (item: CartItem) => set((state) => ({ shoppingCart: [...state.shoppingCart, item], })),
  getProductById: (itemId) =>
		get().shoppingCart.find((item) => item.id === itemId),
  incQty: (itemId) =>
    set(((state) => {
      const founditem = state.shoppingCart.find((item) => item.id === itemId);
      if (founditem) {
        founditem.count += 1;
      }
    })),
    decQty: (itemId) =>
      set(((state) => {
        const foundIndex = state.shoppingCart.findIndex(
          (product) => product.id === itemId
        );
  
        if (foundIndex !== -1) {
          if (state.shoppingCart[foundIndex].count === 1) {
            state.shoppingCart.splice(foundIndex, 1);
          } else {
            state.shoppingCart[foundIndex].count -= 1;
          }
        }
      })),
    setTotal: (total) =>
      set((state) => {
        state.total = total;
      }),
    reset: () => set(() => initailState),

});

