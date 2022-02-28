import React, { useEffect, useState } from "react";
import { LoadingComponent, PaginationComponent, PostComponent, SearchBarComponent } from "..";
import api from "../../../shared/api/api";
import {
  LoadingOnSearchPage,
  Pokemon,
  PokemonResponse,
  ResultBasicPokemon,
} from "../../interfaces";
import { ErrorMsgComponent } from "../error/ErrorMsgComponent";
import "./search-component.scss";

export const SearchComponent = () => {
  const [searchByName, setSearchByName] = useState<string>("");
  const [pokemonUrl, setPokemonUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon/?limit=10");
  const [loadingOnSearchObj, seLoadingOnSearchObj] =
    useState<LoadingOnSearchPage>({
      isLoading: false,
      error: false,
    });
  const [resultsBasicPokemon, setResultsBasicPokemon] = useState<
    ResultBasicPokemon[]
  >([]);
  const [pokemonResponse, setPokemonResponse] = useState<PokemonResponse>();
  const handleSearchByAccountName = (e: any) => {
    const texto = e.current.value;
    setSearchByName(texto);
  };
  const getPokemon = async (searchByName: string) => {
    try {
      // Update state on loading...
      let loadingObj: LoadingOnSearchPage = {
        isLoading: true,
        error: false,
      };
      seLoadingOnSearchObj(loadingObj);
      const resp = await api.get<Pokemon>(
        `https://pokeapi.co/api/v2/pokemon/${searchByName}`
      );
      // console.log("resp.data ", resp.data);
      const pokemon: Pokemon = resp.data;
      const basicPokemon: ResultBasicPokemon[] = [
        {
          name: pokemon.name,
          url: `https://pokeapi.co/api/v2/pokemon/${searchByName}`,
        },
      ];
      setResultsBasicPokemon(basicPokemon);
      // Update state on loading...
      loadingObj = {
        isLoading: false,
        error: false,
      };
      seLoadingOnSearchObj(loadingObj);
    } catch (error) {
      console.log("error ", error);
      setResultsBasicPokemon([]);
      // Update state on loading...
      let loadingObj: LoadingOnSearchPage = {
        isLoading: false,
        error: true,
      };
      seLoadingOnSearchObj(loadingObj);
    }
  };
  const getPokemons = async () => {
    try {
      // Update state on loading...
      let loadingObj: LoadingOnSearchPage = {
        isLoading: true,
        error: false,
      };
      seLoadingOnSearchObj(loadingObj);
      const resp = await api.get<PokemonResponse>(
        `${pokemonUrl}`
      );
      console.log("resp.data ", resp.data);
      setPokemonResponse(resp.data);
      const childrenOfRedditData: ResultBasicPokemon[] = resp.data.results;
      setResultsBasicPokemon(childrenOfRedditData);
      // Update state on loading...
      loadingObj = {
        isLoading: false,
        error: false,
      };
      seLoadingOnSearchObj(loadingObj);
    } catch (error) {
      console.log("error ", error);
      setResultsBasicPokemon([]);
      // Update state on loading...
      let loadingObj: LoadingOnSearchPage = {
        isLoading: false,
        error: true,
      };
      seLoadingOnSearchObj(loadingObj);
    }
  };
  const handlePagination = (pageUrlEndPoint : string) => {
    setPokemonUrl(pageUrlEndPoint);
  }

  useEffect(() => {
    // Si en la barra hay algo escrito , entonces buscar al pokemon, si no buscar varios pokemones.
    if (searchByName != "") {
      getPokemon(searchByName);
    } else {
      getPokemons();
    }
  }, [searchByName, pokemonUrl]);
  return (
    <>
      <div className="container">
        <SearchBarComponent
          placeholder={"Buscar por nombre..."}
          handleSearch={handleSearchByAccountName}
        />
        <div className="container">
          <div className="row">
            {resultsBasicPokemon.length > 0 &&
              resultsBasicPokemon.map((basicPokemon, index) => (
                <PostComponent
                  key={`key-post-component-${index}`}
                  name={basicPokemon.name}
                  url={basicPokemon.url}
                />
              ))}
            {loadingOnSearchObj.isLoading && <LoadingComponent />}
            {loadingOnSearchObj.error && (
              <ErrorMsgComponent msg={"Hubo un error..."} />
            )}
          </div>
          <PaginationComponent pokemonR={pokemonResponse} setPokemonUrl={setPokemonUrl} />
        </div>
      </div>
    </>
  );
};
