import React, { useState, useEffect } from "react";
import ShoppingList from "./shopping-list";
import { ShoppingCart } from "lucide-react";
import MyShoppingCart from "./shopping-cart";

const App: React.FC = () => {
    const [page, setPage] = useState("shoppingList");

    useEffect(() => {
        window.history.replaceState({ page }, '');


        const handlePopState = (event) => {
            if (event.state && event.state.page) {
                setPage(event.state.page);
            }
        }; window.addEventListener('popstate', handlePopState);


        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const pageContent = () => {
        switch (page) {
            case "shoppingList":
                return (<ShoppingList />);

            case "shoppingCart":
                return (<MyShoppingCart/>);
            default:
                return <div>Page not found</div>;
        }
    };
    const navigate = (newPage) => {
        setPage(newPage);
        window.history.pushState({ page: newPage }, '');
    };

    return (
        <>
            <div className="container">
                <div className="navigationButtons">
                    {page==="shoppingList"? (<div className="shoppingCart" onClick={() => navigate("shoppingCart")}>
                        <button size="icon">
                            <ShoppingCart/>
                        </button>
                    </div>):(<></>)}
                </div>
                {pageContent()}

            </div>
        </>
    );

};

export default App;