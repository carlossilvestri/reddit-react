import React, { useState, useEffect } from "react";
import { PokemonResponse } from "../../interfaces/pokemons.interface";

interface PaginationProps {
  pokemonR: PokemonResponse | undefined;
  setPokemonUrl: (value: React.SetStateAction<string>) => void;
}

export const PaginationComponent = ({
  pokemonR,
  setPokemonUrl,
}: PaginationProps) => {

  const onNextPage = () => {
    if (pokemonR) {
      setPokemonUrl(pokemonR.next);
    }
  };
  const onPageBefore = () => {
    if (pokemonR) {
      if (pokemonR.previous) {
        setPokemonUrl(pokemonR.previous);
      }
    }
  };


  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center mt-2">
        <li
          className={`page-item`}
          onClick={onPageBefore}
        >
          <span className="page-link">
            Anterior
          </span>
        </li>
        <li className="page-item" onClick={onNextPage}>
          <button className="page-link">Siguiente</button>
        </li>
      </ul>
    </nav>
  );
};
