import { useState, useEffect } from "react";
//import { Link } from "react-router";

type CardProps = {
  title: string;
  type?: string; // tipo opzionale
};

const Card = ({ title, type }: CardProps) => {
  return (
    <div className="w-48 aspect-square rounded-xl bg-white shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 relative">
      
      {/* Titolo */}
      <h3 className="absolute top-2 left-2 font-bold text-gray-800">
        {title}
      </h3>

      {/* Quadrato tipo in basso a destra */}
      {type && (
        <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
          {type}
        </div>
      )}

      {/* Sfondo */}
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
        // Qui passiamo un tipo fittizio solo per esempio
        <Card key={index} title={title} type="Fuoco" />
      ))}
    </div>
  );
};