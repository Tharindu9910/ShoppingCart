import ContestPreview from "./list-preview";
import { useEffect, useState } from "react";
import * as React from "react";
import { useStore } from "../store/store";
import { CircleX, ShoppingBasketIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";



const ShoppingList: React.FC = () => {
    const { loading, error, testData, fetchData, reset } = useStore(useShallow((state) => ({
        loading: state.loading,
        error: state.error,
        testData: state.testData,
        fetchData: state.fetchData,
        reset: state.reset,
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
            
            {/* <button onClick={reset} variant="destructive" size="icon">
                <CircleX />
            </button> */}
            <div className="shoppingCart">
                <button size="icon">
                    <ShoppingBasketIcon />
                </button>
            </div>
            <div className="contest-list">
                {testData.map((item) => {
                    return (<ContestPreview
                        key={item.id}
                        item={item}
                    />);
                })}</div>
        </>

    );
};

export default ShoppingList;