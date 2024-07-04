import axios from "axios";
import { API_SERVER_URL } from "./public-config";

export const fetchShoppingList = async () => {
    try {
        const resp = await axios.get(`${API_SERVER_URL}/shopping_list`);
        return resp.data.items;
    } catch (error) {
        console.error('Error fetchShoppingList:', error);
    }

}
export const addCartItems = async (id: string, name: string, price: Number, count: Number) => {
    try {
        await axios.post(`${API_SERVER_URL}/shopping_cart`, { id, name, price, count });
    } catch (error) {
        console.error('Failed to save cart data to database', error);
    }

}

export const updateItemCount = async (id: string, count: number) => {
    try {
        await axios.put(`${API_SERVER_URL}/shopping_cart/${id}`, { count });
    } catch (error) {
        console.error('Error updating item count:', error);
    }
};

export const deleteCartItem = async (id: string) => {
    try {
        const response = await axios.delete(`${API_SERVER_URL}/shopping_cart/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
};

export const deleteAllCartItems = async () => {
    try {
        const response = await axios.delete(`${API_SERVER_URL}/shopping_cart`);
        return response.data;
    } catch (error) {
        console.error('Error deleting all items:', error);
        throw error;
    }
};