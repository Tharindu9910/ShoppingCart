import { StateCreator, create } from 'zustand';
import { addCartItems, deleteAllCartItems, deleteCartItem, fetchShoppingList, updateItemCount } from '../api-client';
import { CartItem, Item } from '../types/shopping-cart';



export type CartSlice = {
  loading: boolean;
  error: Error | null;
  shoppingList: Array<Item>;
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
  shoppingList: [],
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
      const data = await fetchShoppingList();  //API call
      set({ shoppingList: data, loading: false });
    } catch (error) {
      set({ error: error, loading: false });
    }
  },
  addItemToCart: (item: Item) => {
    const cartItem: CartItem = { ...item, count: 1 };
    set((state) => ({
      shoppingCart: [...state.shoppingCart, cartItem]}));
      addCartItems(cartItem.id,cartItem.name,cartItem.price,cartItem.count); //API call
    },
    
  removeItemFromCart: (item: CartItem) => set((state) => ({ shoppingCart: [...state.shoppingCart, item], })),
  getProductById: (itemId) =>
		get().shoppingCart.find((item) => item.id === itemId),
  incQty: (itemId) =>
    set(((state) => {
      const founditem = state.shoppingCart.find((item) => item.id === itemId);
      if (founditem) {
        founditem.count += 1;
        updateItemCount(founditem.id, founditem.count);//API call
      }
    })),
    decQty: (itemId) =>
      set(((state) => {
        const foundIndex = state.shoppingCart.findIndex(
          (item) => item.id === itemId
        );
  
        if (foundIndex !== -1) {
          if (state.shoppingCart[foundIndex].count === 1) {
            state.shoppingCart.splice(foundIndex, 1);
            deleteCartItem(itemId); //API call
          } else {
            state.shoppingCart[foundIndex].count -= 1;
            updateItemCount(itemId, state.shoppingCart[foundIndex].count);//API call
          }
        }
      })),
    setTotal: (total) =>
      set((state) => {
        state.total = total;
      }),
    reset:()=>{deleteAllCartItems(); set(() => initailState);} //API call 

});

