import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import ListCards from "./ListCards";

export default function ViewDeck({
  deleteDeckButtonHandler
}) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cardSet, setCardSet] = useState([]);
  const {url, path} = useHistory()

  useEffect(() => {
    async function loadThisDeck() {
      try {
        const thisDeck = await readDeck(deckId);
        setDeck(thisDeck);
        setCardSet(thisDeck.cards);
      } catch (error) {
        throw error;
      }
    }
    loadThisDeck();
  }, [deckId]);

    return (
      <div>
        <div>
          <nav aria-label="breadcrumb" className="ml-5 mr-5">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to={"/"}>
                  <span className="oi oi-home mr-1"></span>Home
                </NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {deck.name}
              </li>
            </ol>
          </nav>
          <div key={`this-deck`} className="ml-4 mr-4">
            <div key="deck-body" className="card-body">
              <h5
                key="deck-title"
                className="card-title d-flex align-items-center"
              >
                {deck.name}
              </h5>
              <p key="deck-description-text" className="card-text">
                {deck.description}
              </p>
              <div
                key="deck-action-buttons"
                className="d-flex align-items-center"
              >
                <NavLink
                  to={`/decks/${deck.id}/edit`}
                  key="edit-button"
                  role="button"
                  className="btn btn-secondary mr-2"
                >
                  <span className="oi oi-pencil mr-1"></span>
                  Edit
                </NavLink>
                <NavLink
                  to={`/decks/${deck.id}/study`}
                  key="study-button"
                  role="button"
                  className="btn btn-primary mr-2"
                >
                  <span className="oi oi-book mr-1"></span>
                  Study
                </NavLink>
                <NavLink
                  to={`/decks/${deck.id}/cards/new`}
                  key="add-cards-button"
                  role="button"
                  className="btn btn-primary mr-5"
                >
                  <span className="oi oi-plus mr-1"></span>
                  Add Cards
                </NavLink>
                <NavLink
                  to={`/decks/${deck.id}`}
                  key="delete-button"
                  onClick={() => deleteDeckButtonHandler(deck.id)}
                  className="btn btn-danger ml-auto"
                >
                  <span className="oi oi-trash"></span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <h4 className="ml-5 mr-5">Cards</h4>
        <ListCards deck={deck} cardSet={cardSet} setCardSet={setCardSet}/>
      </div>
    );
}
