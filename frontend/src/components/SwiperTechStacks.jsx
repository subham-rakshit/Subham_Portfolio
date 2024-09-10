import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { SyncLoader } from "react-spinners";

//NOTE: Individual Swiper Card
const Card = ({ cards, setCards, _id, techImageURL, techName, index }) => {
  //NOTE: Storing x axis value while dragging
  const x = useMotionValue(0);

  //NOTE: Opacity of the card
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]); //INFO: While x axis value is > 150px either it + or - opacity changes according to it by useTransform hook from framer motion

  //NOTE: Rotate raw value
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]); //INFO: While x axis value is > 150px either it + or -, we are storing the rotate value

  //NOTE: Check if card is in top or not
  const isFront = _id === cards[cards.length - 1]._id; //INFO: We are checking either the card is top of the cards list or not

  //NOTE: Main rotate value with offsect value
  const rotate = useTransform(() => {
    const offset = isFront ? 0 : index % 2 ? 6 : -6; //INFO: According to inFront value, if card is in top then we are not adding offset to it.

    return rotateRaw.get() + offset; //INFO: Return the rotate value with offset
  });

  //NOTE: onDragEnd event
  const handleDragEnd = () => {
    //INFO: We are recieving a perticular 'x' axis value. And if that value is greater than 100 (if it's + or -), then we simply filter out that card from cards list. Math.abs(x.get()) -> it will give u the absolute value of x axis wheather it + or -
    if (Math.abs(x.get()) > 100) {
      setCards((prev) => prev.filter((value) => value._id !== _id));
    }
  };
  return (
    <motion.div
      className="w-full max-w-[400px] border-[2px] border-black rounded-xl overflow-hidden bg-white cursor-grab active:cursor-grabbing origin-bottom"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
        zIndex: index * 2 + 5,
      }}
      drag="x" //INFO: Make sure cards can drag in x axis
      dragConstraints={{
        //INFO: dragConstraints [left: 0, right: 0] means cards cant drag in x axis but it has some elasticity while dragging.
        left: 0,
        right: 0,
      }}
      //INFO: animate while card infront [we are storing cards from last to first stack]
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      //INFO: onDragEnd means while drag ends
      onDragEnd={() => cards.length > 1 && handleDragEnd()}
    >
      <img
        src={techImageURL}
        alt={techName}
        className="bg-cover w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] p-5 sm:p-10 mx-auto pointer-events-none"
      />
      <span
        className="inline-block w-full p-5 mt-5 text-2xl font-extrabold tracking-tighter text-center uppercase bg-gray-800 font-poppins text-zinc-100"
        style={{ transform: "scaleY(1.3)" }}
      >
        {techName}
      </span>
    </motion.div>
  );
};

//IDEA: MAIN Function
function SwiperTechStacks({ techStacks, selectedCategory }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  //NOTE: Simulate loading when category changes
  useEffect(() => {
    setLoading(true); //INFO: Start loader
    setCards(
      techStacks
        ? techStacks.filter((tech) => tech.category === selectedCategory)
        : []
    ); //INFO: Restoring tech stacks while category changed
    const timer = setTimeout(() => {
      setLoading(false); //INFO: Stop loader after delay
    }, 1000); //INFO: Adjust the delay as needed (1 second here)

    return () => clearTimeout(timer); //INFO: Cleanup
  }, [selectedCategory]);

  return (
    <div
      className="grid w-full min-h-[600px] gap-1 py-10 sm:gap-3 lg:gap-5 place-items-center px-5"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      {loading ? (
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center h-full">
          <SyncLoader color="#36d7b7" size={15} />
        </div>
      ) : (
        cards &&
        cards.map((card, index) => (
          <Card
            {...card}
            index={index}
            key={card._id}
            setCards={setCards}
            cards={cards}
          />
        ))
      )}
    </div>
  );
}

export default SwiperTechStacks;
