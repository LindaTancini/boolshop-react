//Importazioni
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 mt-4 p-3">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
