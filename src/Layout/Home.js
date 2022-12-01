import React from "react";
import { NavLink } from "react-router-dom";
import ListDeck from "./ListDeck";

export default function Home({ decks, deleteDeckButtonHandler }) {
  //returns create deck button and a list of deck cards component
  return (
    <div className="container">
      <NavLink to={"/decks/new"} role="button" className="btn btn-secondary">
        <span className="oi oi-plus mr-1"></span>
        Create Deck
      </NavLink>
      <ListDeck
        decks={decks}
        deleteDeckButtonHandler={deleteDeckButtonHandler}
      />
    </div>
  );
}
