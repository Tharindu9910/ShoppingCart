import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from "react";
import * as React from "react";
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '../store/store';


const ListPreview: React.FC<{
  item: object
}> = ({ item }) => {//defining type as react function
  const { total,shoppingCart,addItemToCart,getProductById,incQty,decQty,setTotal } = useStore(useShallow((state) => ({
    total: state.total,
    shoppingCart: state.shoppingCart,
    addItemToCart: state.addItemToCart,
    getProductById: state.getProductById,
    incQty:state.incQty,
    decQty: state.decQty,
    setTotal: state.setTotal,
  })));
  //console.log(shoppingCart.length);
  console.log(shoppingCart);
  const itemAvailability = getProductById(item.id);
  console.log(item.id);
  console.log(total)

  useEffect(() => {
		const unSub = useStore.subscribe(
			(state) => state.shoppingCart,
			(shoppingCart) => {
				setTotal(
					shoppingCart.reduce((acc, test) => acc + test.price * test.count, 0)
				);
			},
			{ fireImmediately: true }
		);
		return unSub;
	}, [setTotal]);
  return (
    <>

      {itemAvailability ? (<div className="list-preview link">
        <h2 className="name">{item.name}</h2>
        
        <p className="price">${item.price}</p>
        <button onClick={() => decQty(item.id)} size="icon">
          <Minus />
        </button>
        <button  onClick={() => incQty(item.id)} size="icon">
          <Plus />
        </button>
      </div>)
        : (<div className="list-preview link">
          <h2 className="name">{item.name}</h2>
          {/* <div
          className="features"
          dangerouslySetInnerHTML={{ __html: item.features }}
        /> */}
          <p className="price">${item.price}</p>
          <a className="url" onClick={() => addItemToCart(item)}>
            Add To Cart
          </a>
        </div>)
      }
    </>

  );
};

export default ListPreview;