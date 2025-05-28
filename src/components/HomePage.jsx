import Carousel from "./Carousel";

function HomePage() {
    return (
        <>
        <h2 className="text-center">Gli album più venduti</h2>
        <Carousel/>
        <h2 className="text-center">Gli ultimi arrivi</h2>
        <Carousel/>
        </>
        
    )
}

export default HomePage;