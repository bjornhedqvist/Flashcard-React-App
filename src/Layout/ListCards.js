import React from "react";
import { useState, useEffect } from "react";
import {
  NavLink,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { deleteCard, readDeck } from "../utils/api";

export default function ListCards({ deck, cardSet, setCardSet }) {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  async function loadThisDeck() {
    try {
      const thisDeck = await readDeck(deck.id);
      setCardSet(thisDeck.cards);
    } catch (error) {
      throw error;
    }
  }

  const deleteCardButtonHandler = async (cardIdContent) => {
    if (
      window.confirm(
        "Delete this card? \n \n You will not be able to recover it"
      )
    ) {
      await deleteCard(cardIdContent);
      loadThisDeck();
      history.push(`/decks/${deck.id}`);
    }
  };

  //returns a card for each in the deck
  return cardSet.map((card, i) => {
    return (
      <React.Fragment>
        <div className="ml-4 mr-4">
          <div className="ml-4 mr-4">
            <div className="card">
              <ul className="list-group list-group-flush">
                <li key={`card-${[i]}`} className="list-group-item card-body">
                  <div className="container">
                    <div className="row row-cols-2">
                      <div className="col ml-n2">
                        <p
                          key={`card-${[i]}-front-text`}
                          className="card-text mt-n1 mb-2"
                        >
                          {card.front}
                        </p>
                      </div>
                      <div className="col">
                        <p
                          key={`card-${[i]}-back-text`}
                          className="card-text mt-n2 mb-2"
                        >
                          {card.back}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    key={`card-${[i]}-action-buttons`}
                    className="d-flex justify-content-end"
                  >
                    <NavLink
                      to={`${url}/cards/${card.id}/edit`}
                      key={`edit-card-${[i]}-button`}
                      role="button"
                      className="btn btn-secondary mr-2"
                    >
                      <span className="oi oi-pencil mr-1"></span>
                      Edit
                    </NavLink>
                    <button
                      key={`delete-card-${[i]}-button`}
                      onClick={() => deleteCardButtonHandler(card.id)}
                      className="btn btn-danger"
                    >
                      <span className="oi oi-trash"></span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  });
}
