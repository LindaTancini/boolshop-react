import { createContext } from "react";

const WishContext = createContext({ wish: [], setWish: () => { } });

export default WishContext;