import React,{useEffect} from "react";
import Header from "./header";
import ShoppingList from "./shopping-list";


const App: React.FC = () => {
    return (
        <>
            <div className="container"><Header message="StartShopping.." /></div>
            <ShoppingList/>
        </>
    );

};

export default App;