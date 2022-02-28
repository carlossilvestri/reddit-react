import React, { useEffect, useState } from "react";
import "./post.scss";
import { Pokemon, ResultBasicPokemon } from "../../interfaces";
import api from "../../../shared/api/api";

export const PostComponent = ({ name, url }: ResultBasicPokemon) => {
  const noImage: string =
    "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
  const [imgPokemon, setImgPokemon] = useState("");
  useEffect(() => {
    const getPokemon = async (pokemonUrl: string) => {
      try {
        const resp = await api.get<Pokemon>(`${pokemonUrl}`);
        // console.log("resp.data ", resp.data);
        const pokemon: Pokemon = resp.data;
        setImgPokemon(pokemon.sprites.front_default);
      } catch (error) {
        console.log("error ", error);
      }
    };
    getPokemon(url);
  }, [url]);

  return (
    <>
      <div className="col-12 col-md-3 mt-2">
        <div className="card">
          <img
            src={imgPokemon && imgPokemon.length > 5 ? imgPokemon : noImage}
            className="card-img-top"
            alt="Fissure in Sandstone"
          />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            {/* <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#!" className="btn btn-primary">
              Button
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
};
