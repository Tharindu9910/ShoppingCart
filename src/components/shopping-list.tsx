import ContestPreview from "./list-preview";
import { useEffect, useState } from "react";
import * as React from "react";
import Header from "./header";
import { fetchShoppingList } from "../api-client";

interface ShoppingListProps {
    initialItems: Array<{
        id: number;
        name: string;
        price: string;
    }>;
}


const ShoppingList: React.FC<ShoppingListProps>  = ({ initialItems }) => {
    const [items, setItems] = useState(initialItems?? []);

    useEffect(() => {
        if (!initialItems) {
            fetchShoppingList().then((items) => {
                setItems(items);
            });
        }
    }, [initialItems]);

    return (
        <>
            <div className="contest-list">
                {items.map((item) => {
                    return (<ContestPreview
                        key={item.id}
                        item={item}
                         />);
                })}</div>
                

        </>

    );
};

export default ShoppingList;