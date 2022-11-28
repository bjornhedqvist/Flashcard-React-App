import React from "react";
import { NavLink } from "react-router-dom";
import ListDeck from "./ListDeck";

export default function Home({ decks, deleteButtonHandler }) {
  //sets up an icon to be used in the create deck button
  const createIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-plus-lg"
      viewBox="2 2 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
      />
    </svg>
  );

  //returns create deck button and a list of deck cards component
  return (
    <div className="container">
      <NavLink to={"/decks/new"} role="button" className="btn btn-secondary">
        {createIcon}
        Create Deck
      </NavLink>
      <ListDeck decks={decks} deleteButtonHandler={deleteButtonHandler}/>
    </div>
  );
}
