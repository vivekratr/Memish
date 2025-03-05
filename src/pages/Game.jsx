import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Game = () => {
  return (
    <div>
      <Navbar />
      <img
        className="  min-w-full"
         loading="lazy"
            draggable={`false`}
        src="https://i.imgur.com/vPnghUo.png"
        alt=""
      />
      <Footer />
    </div>
  );
};

export default Game;
