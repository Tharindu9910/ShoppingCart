import {createRoot} from "react-dom/client";
import App from "./components/app";
import axios from "axios";
import { API_SERVER_URL } from "./public-config";


const container = document.getElementById("app");
const root = createRoot(container);

axios.get(`${API_SERVER_URL}/shopping_list`).then((resp)=>{
    console.log(resp.data);
    
});
root.render(<App/>);
