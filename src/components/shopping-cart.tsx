
import * as React from "react";
import { useStore } from "../store/store";
import { useShallow } from "zustand/react/shallow";
import { Trash2 } from "lucide-react";




const MyShoppingCart: React.FC = () => {
    const { total, shoppingCart, reset } = useStore(useShallow((state) => ({
        total: state.total,
        shoppingCart: state.shoppingCart,
        reset: state.reset,
    })));


    return (
        <>
            <div className="shoppingCart">
                <button onClick={reset} variant="destructive" size="icon"><Trash2 /></button>
            </div>
            <h2 className="page-title">Shopping Cart</h2>
            <div className="cart-preview">
                <ul>
                    {shoppingCart.map((item) => (
                        <li key={item.id}>
                            <span><div className="name-space">{item.name}</div></span>
                            <span>${item.price.toFixed(2)}</span>
                            <span>Quantity: {item.count}</span>
                        </li>
                    ))}
                </ul>
                <div className="total">
                    <strong>Total Price: ${total.toFixed(2)}</strong>
                </div>
            </div>
            <div className="button">
                <button onClick={reset}>Checkout</button>
            </div>
            {/* <div className="contest-list"> */}
            {/* <Header message="StartShopping.." /> */}
            {/* {shoppingCart.map((item) => {
                    return (<div className="list-preview link">
                        <h2 className="name">{item.name}</h2>
                        <p className="price">${item.price}</p>
                        
                      </div>);
                })}</div> */}
        </>

    );
};

export default MyShoppingCart;