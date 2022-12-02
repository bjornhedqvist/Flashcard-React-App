import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../utils/api";
import CardFormComponent from "./CardFormComponent";

export default function EditCard() {
  const { cardId, deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const initialEditCardFormState = {
    front: "",
    back: "",
  };
  const [editCardFormData, setEditCardFormData] = useState({
    ...initialEditCardFormState,
  });

  useEffect(() => {
    async function loadThisDeck() {
      try {
        const thisDeck = await readDeck(deckId);
        setDeck(thisDeck);
      } catch (error) {
        throw error;
      }
    }
    loadThisDeck();
  }, [deckId]);

  useEffect(() => {
    async function loadThisCard() {
      try {
        const thisCard = await readCard(cardId);
        setEditCardFormData({
          front: `${thisCard.front}`,
          back: `${thisCard.back}`,
          id: `${thisCard.id}`,
          deckId: Number(thisCard.deckId),
        });
      } catch (error) {
        throw error;
      }
    }
    loadThisCard();
  }, [cardId, setEditCardFormData]);

  const handleEditCardInputChange = ({ target }) => {
    setEditCardFormData({
      ...editCardFormData,
      [target.name]: target.value,
    });
  };

  const cancelEditCardHandler = (event) => {
    setEditCardFormData({...initialEditCardFormState})
    history.push(`/decks/${deckId}`);
  };

  const submitEditCardFormHandler = async (event) => {
    event.preventDefault();
    await updateCard(editCardFormData);
    setEditCardFormData({ ...initialEditCardFormState });
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb" className="ml-5 mr-5">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <NavLink to={"/"}>
              <span className="oi oi-home mr-1"></span>Home
            </NavLink>
          </li>
          <li className="breadcrumb-item">
            <NavLink to={`/decks/${deck.id}`}>{deck.name}</NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2 className="text-left ml-5">Edit Card</h2>
      <CardFormComponent buttonName={"Cancel"}
        submitCardFormHandler={submitEditCardFormHandler}
        handleCardInputChange={handleEditCardInputChange}
        cardFormData={editCardFormData}
        cancelCardHandler={cancelEditCardHandler}
      />
    </div>
  );
}
