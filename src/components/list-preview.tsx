import * as React from "react";

const ListPreview: React.FC<{
    item: object}> = ({ item }) => {//defining type as react function
    
    return (
   
        <div className="list-preview link">
        <h2 className="name">{item.name}</h2>
        {/* <div
          className="features"
          dangerouslySetInnerHTML={{ __html: item.features }}
        /> */}
        <p className="price">${item.price}</p>
        <a className="url" href={""}>
          Add To Cart
        </a>
      </div>
    );
};

export default ListPreview;