import React from "react";
import "./post.scss";
import { Child } from '../../interfaces/reddit.interfaces';

export const PostComponent = ({data} : Child) => {
    const noImage : string = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
  return (
    <>
      <div className="col-12 col-md-3 mt-2">
        <div className="card">
          <img
            src={data.thumbnail && data.thumbnail.length > 5  ? data.thumbnail : noImage}
            className="card-img-top"
            alt="Fissure in Sandstone"
          />
          <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
            {/*<p className="card-text">
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
