import { useContext } from "react";
import CartContext from "../contexts/CartContext";

function CartPage() {

    const {cart, setCart} = useContext(CartContext);


    const removeItemCart = (indexToRemove) => {
        setCart((cart) => cart.filter((_, index) => index !== indexToRemove));
    };

    console.log(cart);
    return (
        <div>
            <div>
                {cart.map((c, i) => (<div key={i}>
                    <p>{c.name}</p>
                    <button onClick={()=> removeItemCart(i)}>remove</button>
                    </div>))}
            </div>
        </div>
    )
}

export default CartPage;