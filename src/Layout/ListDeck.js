import React from "react";
import { NavLink } from "react-router-dom";

export default function ListDeck({ deleteButtonHandler, decks }) {

  //maps a card with buttons for each deck from the array passed in as a prop
  return decks.map((deck) => {
    return (
      <div key={`home-div-${deck.name}`} className="card mt-3">
        <div key="home-sub" className="card-body">
          <h5 key="deck-title" className="card-title d-flex align-items-center">
            {deck.name}
            <small key="cards-length-text" className="text-muted ml-auto">
              {deck.cards.length} cards
            </small>
          </h5>
          <p key="deck-description-text" className="card-text"> {deck.description}</p>
          <div key="deck-action-buttons" className="d-flex align-items-center">
            <NavLink to={""} key="view-button" role="button" className="btn btn-secondary mr-2">
            <span className="oi oi-eye mr-1"></span>
              View
            </NavLink>
            <NavLink to={""} key="study-button" role="button" className="btn btn-primary mr-5">
            <span className="oi oi-book mr-1"></span>
              Study
            </NavLink>
            <button
              key="delete-button"
              onClick={() => deleteButtonHandler(deck.name)}
              className="btn btn-danger ml-auto"
            >
              <span className="oi oi-trash"></span>
            </button>
          </div>
        </div>
      </div>
    );
  });
}


// <span className="oi oi-pencil"></span>
// <span className="oi oi-home"></span>