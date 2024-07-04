import axios from "axios";
import { API_SERVER_URL } from "./public-config";
import { CartItem } from "./types/shopping-cart";


export const fetchShoppingList = async ()=>{
    try {
        const resp = await axios.get(`${API_SERVER_URL}/shopping_list`);
        return resp.data.items;
    } catch (error) {
        console.error('Error fetchShoppingList:', error);
    }
    
}
export const addCartItems = async (id,name,price,count)=>{
    try {
        await axios.post(`${API_SERVER_URL}/shopping_cart`, { id,name,price,count });
      } catch (error) {
        console.error('Failed to save cart data to database', error);
      }
    
}