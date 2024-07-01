import axios from "axios";
import { API_SERVER_URL } from "./public-config";

export const fetchShoppingList = async ()=>{
    try {
        const resp = await axios.get(`${API_SERVER_URL}/shopping_list`);
        return resp.data.items;
    } catch (error) {
        console.error('Error fetchShoppingList:', error);
    }
    
}