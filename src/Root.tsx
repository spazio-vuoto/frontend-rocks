import { useState, useEffect } from "react";
import { Link } from "react-router";

type CardProps = {
  title: string;
};

const Card = ({ title }: CardProps) => {
  return (
    <div className="w-48 aspect-square rounded-xl bg-white shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 relative">
      
      {}
      <h3 className="absolute top-2 left-2 font-bold text-gray-800">
        {title}
      </h3>

      {}
      <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
      
    </div>
  );
};

export const Root = () => {
  const [cards, setCards] = useState<string[]>([]);

  useEffect(() => {
    setCards(["Card 1", "Card 2", "Card 3", "Card 4"]);
  }, []);

  return (
    <div className="p-6 flex gap-4 flex-wrap">
      {cards.map((title, index) => (
        <Card key={index} title={title} />
      ))}
    </div>
  );
};