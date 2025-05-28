import Carousel from "./Carousel";
import CarouselBis from "./CarouselBis";

function HomePage() {
    return (
        <>
        <h2 className="text-center">Gli album più venduti</h2>
        <Carousel/>
        <h2 className="text-center">Gli ultimi arrivi</h2>
        <CarouselBis />
        </>
        
    )
}

export default HomePage;