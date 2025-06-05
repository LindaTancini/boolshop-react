// // Importazioni
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DefaultLayout from "./layout/DefaultLayout";
// import HomePage from "./pages/HomePage";
// import AlbumListPage from "./pages/AlbumListPage";
// import CartPage from "./pages/CartPage";
// import ArtistsPage from "./pages/ArtistsPage";
// import AnArtistPage from "./pages/AnArtistPage";
// import { useState } from "react";
// import ContextLoader from "./contexts/contextLoader";
// import ContextError from "./contexts/contextError";
// import AlbumDetails from "./pages/AlbumDetails";
// import CartContext from "./contexts/CartContext";
// import WishContext from "./contexts/WhishContext";
// import WishListPage from "./pages/WishListPage";
// import PaymentContext from "./contexts/paymentContext";
// import useLocalStorageState from "use-local-storage-state";
// import SuccessPage from "./pages/SuccessPage";
// import ShowCartContext from "./contexts/showCartContext";

// function App() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   const [cart, setCart] = useLocalStorageState("cart", {
//     defaultValue: [],
//     parse: (str) => {
//       try {
//         const parsed = JSON.parse(str);
//         return Array.isArray(parsed) ? parsed : [];
//       } catch {
//         return [];
//       }
//     },
//   });

//   const [wish, setWish] = useLocalStorageState("wish", {
//     defaultValue: [],
//     parse: (str) => {
//       try {
//         const parsed = JSON.parse(str);
//         return Array.isArray(parsed) ? parsed : [];
//       } catch {
//         return [];
//       }
//     },
//   });

//   const [payment, setPayment] = useState({
//     nome: "",
//     cognome: "",
//     indirizzo: "",
//   });

//   const [showCart, setShowCart] = useState(false);

//   return (
//     <ContextError.Provider value={{ isError, setIsError }}>
//       <ContextLoader.Provider value={{ isLoading, setIsLoading }}>
//         <CartContext.Provider value={{ cart, setCart }}>
//           <ShowCartContext.Provider value={{showCart, setShowCart}}>


//           <WishContext.Provider value={{ wish, setWish }}>
//             <PaymentContext.Provider value={{ payment, setPayment }}>
//               <Router>
//                 <Routes>
//                   <Route path="/" element={<DefaultLayout />}>
//                     <Route index element={<HomePage />} />
//                     <Route path="products" element={<AlbumListPage />} />
//                     <Route path="album/:slug" element={<AlbumDetails />} />
//                     <Route path="wishlist" element={<WishListPage />} />
//                     <Route path="cart" element={<CartPage />} />
//                     <Route path="/success" element={<SuccessPage />} />
//                   </Route>

//                   <Route path="/artists" element={<DefaultLayout />}>
//                     <Route index element={<ArtistsPage />} />
//                     <Route path=":slug" element={<AnArtistPage />} />
//                   </Route>

//                 </Routes>
//               </Router>
//             </PaymentContext.Provider>
//           </WishContext.Provider>
//           </ShowCartContext.Provider>
//         </CartContext.Provider>
//       </ContextLoader.Provider>
//     </ContextError.Provider>
//   );
// }

// export default App;
// Importazioni
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./pages/HomePage";
import AlbumListPage from "./pages/AlbumListPage";
import CartPage from "./pages/CartPage";
import ArtistsPage from "./pages/ArtistsPage";
import AnArtistPage from "./pages/AnArtistPage";

import ContextLoader from "./contexts/contextLoader";
import ContextError from "./contexts/contextError";
import AlbumDetails from "./pages/AlbumDetails";
import CartContext from "./contexts/CartContext";
import WishContext from "./contexts/WhishContext";
import WishListPage from "./pages/WishListPage";
import PaymentContext from "./contexts/paymentContext";

import SuccessPage from "./pages/SuccessPage";
import ShowCartContext from "./contexts/showCartContext";

import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // solo dopo che siamo sicuri di essere nel client
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [payment, setPayment] = useState({
    nome: "",
    cognome: "",
    indirizzo: "",
  });
  const [showCart, setShowCart] = useState(false);

  const [cart, setCart] = useLocalStorageState("cart", {
    defaultValue: [],
    parse: (str) => {
      try {
        const parsed = JSON.parse(str);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    },
  });

  const [wish, setWish] = useLocalStorageState("wish", {
    defaultValue: [],
    parse: (str) => {
      try {
        const parsed = JSON.parse(str);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    },
  });

  if (!isClient) return null; // evita il crash durante il primo render (soprattutto in SSR o ambienti restrittivi)

  return (
    <ContextError.Provider value={{ isError, setIsError }}>
      <ContextLoader.Provider value={{ isLoading, setIsLoading }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <ShowCartContext.Provider value={{ showCart, setShowCart }}>
            <WishContext.Provider value={{ wish, setWish }}>
              <PaymentContext.Provider value={{ payment, setPayment }}>
                <Router>
                  <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                      <Route index element={<HomePage />} />
                      <Route path="products" element={<AlbumListPage />} />
                      <Route path="album/:slug" element={<AlbumDetails />} />
                      <Route path="wishlist" element={<WishListPage />} />
                      <Route path="cart" element={<CartPage />} />
                      <Route path="/success" element={<SuccessPage />} />
                    </Route>
                    <Route path="/artists" element={<DefaultLayout />}>
                      <Route index element={<ArtistsPage />} />
                      <Route path=":slug" element={<AnArtistPage />} />
                    </Route>
                  </Routes>
                </Router>
              </PaymentContext.Provider>
            </WishContext.Provider>
          </ShowCartContext.Provider>
        </CartContext.Provider>
      </ContextLoader.Provider>
    </ContextError.Provider>
  );
}
export default App;
