import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Card = ({
  cards,
  setCards,
  _id,
  techImageURL,
  techName,
  index,
  selectedCategory,
}) => {
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

  const cardsBySelectedCategory = cards.filter(
    (item) => item.category === selectedCategory
  );

  const cardsBySelectedCategoryLength = cardsBySelectedCategory.length;

  const isFront =
    _id === cardsBySelectedCategory[cardsBySelectedCategoryLength - 1]._id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : index % 2 ? 6 : -6;

    return rotateRaw.get() + offset;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((prev) => prev.filter((value) => value._id !== _id));
    }
  };
  return (
    <motion.div
      className="w-full max-w-[400px] border border-black rounded-xl overflow-hidden bg-white cursor-grab active:cursor-grabbing origin-bottom"
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
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      onDragEnd={() => cards.length > 1 && handleDragEnd()}
    >
      <img
        src={techImageURL}
        alt={techName}
        className="object-cover w-[350px] h-72 p-5 mx-auto pointer-events-none"
      />
      <span
        className="inline-block w-full p-5 mt-5 text-[2vw] font-extrabold tracking-tighter text-center uppercase bg-gray-100 font-poppins"
        style={{ transform: "scaleY(1.3)" }}
      >
        {techName}
      </span>
    </motion.div>
  );
};

function SwiperTechStacks({ techStacks, selectedCategory }) {
  const [cards, setCards] = useState(techStacks);
  return (
    <div
      className="grid w-full min-h-[500px] gap-1 py-10 sm:gap-3 lg:gap-5 place-items-center"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      {cards &&
        cards.map((card, index) => {
          if (card.category === selectedCategory) {
            return (
              <Card
                {...card}
                index={index}
                key={card._id}
                setCards={setCards}
                cards={cards}
                selectedCategory={selectedCategory}
              />
            );
          }
        })}
    </div>
  );
}

export default SwiperTechStacks;
