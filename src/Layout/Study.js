import React from "react";
import { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

export default function Study({ decks }) {
  const { deckId } = useParams();
  const history = useHistory();

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

  function nextButtonClickHandler() {
    if (cardNumber + 1 === cardSet.length) {
      if (
        window.confirm(
          'Restart cards? \n \n Click "Cancel" to return to the home page'
        )
      ) {
        setCardNumber(0);
      } else {
        history.push("/");
      }
    } else {
      setCardNumber(cardNumber + 1);
      setFlippedToFront(!flippedToFront);
    }
  }

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
        <h2 className="text-left ml-5">Study: {deck.name}</h2>
      </div>
{/* loads the front of a card, then toggles the flippedToFront variable when flipped is clicked, rendering the back. next  button increments to the next card. There is added functionality in next button click handler for flipping the card back to the front, as well as setting up a window to either return to start or redirect to home, when you reach the end of the deck. */}
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
    // adds alternative screen for when deck length is below 3, with a redirect button to adding a new card screen
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
      <h2 className="text-left ml-5">Study: {deck.name}</h2>
      <h4 className="text-left ml-5">Not enough cards.</h4>
      <p className="text-left ml-5">
        You need at least 3 cartds to study. There are {cardSet.length} cards in
        this deck.
      </p>
      <NavLink to={"/cards/new"} role="button" className="btn btn-primary ml-5">
        <span className="oi oi-plus mr-1"></span>
        Create Deck
      </NavLink>
    </div>
  );
}
