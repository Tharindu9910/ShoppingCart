import ReactDOMServer from "react-dom/server";
import App from "../components/app";
import { fetchShoppingList } from "../api-client";

const serverRender = async (req) => {
    const initialData =  { items: await fetchShoppingList()};

    
    return { initialData };
};

export default serverRender;