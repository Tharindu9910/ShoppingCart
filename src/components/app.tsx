import Header from "./header";
import ShoppingList from "./shopping-list";


const App = ({ initialData }) => {
    return (
        <>
            <div className="container"><Header message="StartShopping.." /></div>
            <ShoppingList items={initialData.items}/>
        </>
    );

};

export default App;