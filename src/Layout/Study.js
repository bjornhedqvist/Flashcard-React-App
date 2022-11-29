import React from "react";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { readDeck } from "../utils/api";

export default function Study({ decks }) {
  const { deckId } = useParams();

  const [deck, setDeck] = useState([]);
  const [cardSet, setCardSet] = useState([]);
  const [flippedToFront, setFlippedToFront] = useState(true);
  let [cardNumber, setCardNumber] = useState(0);

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

  //   cardSet.forEach((card, cardIndex) => )

  function nextButtonClickHandler (){
      setCardNumber(cardNumber+1);
      setFlippedToFront(!flippedToFront);
  };

  return cardSet.length >= 3 ? (
    <div>
      <div>
        <nav aria-label="breadcrumb" className="ml-5 mr-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to={"/"}>
                <span className="oi oi-home mr-1"></span>Home
              </NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to={"/decks/deckId"}>{deck.name}</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h2 className="text-center">Study: {deck.name}</h2>
      </div>

      <div>
        {!flippedToFront ? (
          <div className="card ml-5 mr-5 ">
            <div className="card-body">
              <h5 className="card-title">
                Card {cardNumber + 1} of {cardSet.length}
              </h5>
              <p className="card-text">{deck.cards[cardNumber].back}</p>
              <button
                onClick={() => setFlippedToFront(!flippedToFront)}
                className="btn btn-secondary mr-1"
              >
                Flip
              </button>
              <button
                onClick={nextButtonClickHandler}
                className="btn btn-primary ml-1"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="card ml-5 mr-5 ">
            <div className="card-body">
              <h5 className="card-title">
                Card {cardNumber + 1} of {cardSet.length}
              </h5>
              <p className="card-text">{deck.cards[cardNumber].front}</p>
              <button
                onClick={() => setFlippedToFront(!flippedToFront)}
                className="btn btn-secondary"
              >
                Flip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <p>FIXME what displays when cards are less than 3?</p>
  );
}
