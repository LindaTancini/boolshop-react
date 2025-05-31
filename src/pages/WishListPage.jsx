import { useContext } from "react";
import WishContext from "../contexts/WhishContext";
import CartContext from "../contexts/CartContext";


const WishListPage = () => {
    const {cart, setCart} = useContext(CartContext);
    const {wish, setWish} =useContext(WishContext);

    function removeItemWish(indexToRemove) {
        setWish((wish) => wish.filter((_, index) => index !== indexToRemove));
    };

    function addToCart(index) {
        setCart([...cart, wish[index]]);
        console.log(cart);
        removeItemWish(index)
    }

    return <>
    <h2 className="mt-5">LISTA DESIDERI:</h2>
    <ul>
        {wish.map((w,i) => (<li key={i}>
            <h4>{w.name}</h4>
            <button onClick={() => removeItemWish(i)}>remove</button>
            <button onClick={() => addToCart(i)}>addToCart</button>
        </li>))}
    </ul>
    </>
}

export default WishListPage;