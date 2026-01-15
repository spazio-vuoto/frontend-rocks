import { useState, useEffect } from "react";
import { PokeAPI } from "./api";

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  image: string;
};

type PokemonDetails = {
  id: number;
  name: string;
  types: string[];
  image: string;
  height: number;
  weight: number;
  abilities: string[];
};

type CardProps = {
  id: number;
  title: string;
  types: string[];
  image: string;
  onClick?: () => void;
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

const Card = ({ id, title, types, image, onClick }: CardProps) => {
  const bgColor = types.length > 0 ? TYPE_COLORS[types[0]] : "#777";

  return (
    <div
      className="w-48 aspect-square rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 relative"
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      <h3 className="absolute top-2 left-2 font-bold text-white capitalize text-sm">
        #{id.toString().padStart(3, "0")} {title}
      </h3>

      <img
        src={image}
        alt={title}
        className="w-24 h-24 object-contain mx-auto mt-10"
      />

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


type ModalProps = {
  pokemon: PokemonDetails | null;
  onClose: () => void;
};

const PokemonModal = ({ pokemon, onClose }: ModalProps) => {
  if (!pokemon) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 font-bold"
          onClick={onClose}
        >
          X
        </button>

        <h2 className="text-2xl font-bold capitalize">
          #{pokemon.id.toString().padStart(3, "0")} {pokemon.name}
        </h2>

        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-32 h-32 object-contain mx-auto my-4"
        />

        <p>
          <strong>Tipo:</strong> {pokemon.types.join(", ")}
        </p>
        <p>
          <strong>Altezza:</strong> {pokemon.height / 10} m
        </p>
        <p>
          <strong>Peso:</strong> {pokemon.weight / 10} kg
        </p>
        <p>
          <strong>Abilità:</strong> {pokemon.abilities.join(", ")}
        </p>
      </div>
    </div>
  );
};

export const Root = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
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

  const handleCardClick = async (id: number) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
      res.json()
    );

    setSelectedPokemon({
      id: data.id,
      name: data.name,
      types: data.types.map((t: any) => t.type.name),
      image: data.sprites.front_default,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map((a: any) => a.ability.name),
    });
  };

  return (
    <div className="p-6 flex gap-4 flex-wrap">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          title={pokemon.name}
          types={pokemon.types}
          image={pokemon.image}
          onClick={() => handleCardClick(pokemon.id)}
        />
      ))}

      <PokemonModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
};
