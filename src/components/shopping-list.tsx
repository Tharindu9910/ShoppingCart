import ContestPreview from "./list-preview";
import { useEffect, useState } from "react";
import * as React from "react";
import Header from "./header";
import { fetchShoppingList } from "../api-client";

// interface ShoppingListProps {
//     initialitems: Array<{
//         id: number;
//         name: string;
//         categoryName: string;
//     }>;
//     onItemClick: () => void;
// }


const ShoppingList = ({ items }) => {

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