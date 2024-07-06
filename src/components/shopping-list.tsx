import ContestPreview from "./list-preview";
import { useEffect, useState } from "react";
import * as React from "react";
import { useStore } from "../store/store";
import { useShallow } from "zustand/react/shallow";
import Header from "./header";



const ShoppingList: React.FC = () => {
    const { loading, error, shoppingList, fetchData } = useStore(useShallow((state) => ({
        loading: state.loading,
        error: state.error,
        shoppingList: state.shoppingList,
        fetchData: state.fetchData,
    })));

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className="contest-list">
             <Header message="Start Shopping.." /> 
                {shoppingList.map((item) => {
                    return (<ContestPreview
                        key={item.id}
                        item={item}
                    />);
                })}</div>
        </>

    );
};

export default ShoppingList;