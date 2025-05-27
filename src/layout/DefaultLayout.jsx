import Header from '../components/Header';
import Footer from '../components/Footer';

function DefaultLayout({ children }) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <div className="container py-4">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default DefaultLayout;