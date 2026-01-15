import { useState, useEffect } from "react";
import { PokeAPI } from "./api";

/* =======================
   TIPI + COLORI
======================= */
type Pokemon = {
  id: number;
  name: string;
  types: string[];
  image: string;
};

type CardProps = {
  id: number;
  title: string;
  types: string[];
  image: string;
};

const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

/* =======================
   CARD
======================= */
const Card = ({ id, title, types, image }: CardProps) => {
  const bgColor = types.length > 0 ? TYPE_COLORS[types[0]] : "#777";

  return (
    <div
      className="w-48 aspect-square rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 relative"
      style={{ backgroundColor: bgColor }}
    >
      {/* Numero + Nome */}
      <h3 className="absolute top-2 left-2 font-bold text-white capitalize text-sm">
        #{id.toString().padStart(3, "0")} {title}
      </h3>

      {/* Immagine */}
      <img
        src={image}
        alt={title}
        className="w-24 h-24 object-contain mx-auto mt-10"
      />

      {/* Tipi */}
      <div className="absolute bottom-2 left-2 flex gap-1">
        {types.map((type) => (
          <span
            key={type}
            className="text-xs font-bold px-2 py-1 rounded-sm text-white capitalize"
            style={{ backgroundColor: "#00000050" }}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

/* =======================
   ROOT (POKEDEX)
======================= */
export const Root = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // ⚡ Qui specifichiamo offset 0 per partire dal #1
        const response = await PokeAPI.listPokemons(0, 1400);

        const detailedPokemons: Pokemon[] = await Promise.all(
          response.results.map(async (pokemon: any) => {
            const details = await fetch(pokemon.url).then((res) => res.json());

            return {
              id: details.id,
              name: details.name,
              types: details.types.map((t: any) => t.type.name),
              image: details.sprites.front_default,
            };
          })
        );

        setPokemons(detailedPokemons);
      } catch (error) {
        console.error("Errore nel caricamento dei Pokémon", error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="p-6 flex gap-4 flex-wrap">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          title={pokemon.name}
          types={pokemon.types}
          image={pokemon.image}
        />
      ))}
    </div>
  );
};
