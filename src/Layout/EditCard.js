import React from "react";
import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import { readCard, updateCard, readDeck } from "../utils/api";
import CardFormComponent from "./CardFormComponent";

export default function EditCard() {
  const { cardId, deckId } = useParams();
  console.log("******************" + cardId);
  const [deck, setDeck] = useState({});
  const [cardSet, setCardSet] = useState([]);
  const history = useHistory();
  const [updatedDeck, setUpdatedDeck] = useState({});
  const [card, setCard] = useState({});
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
        setCardSet(thisDeck.cards);
        //   setEditDeckFormData({
        //     name: `${thisDeck.name}`,
        //     description: `${thisDeck.description}`,
        //     id: `${thisDeck.id}`,
        //   });
      } catch (error) {
        throw error;
      }
    }
    loadThisDeck();
  }, [deckId /*, setEditDeckFormData*/]);

  useEffect(() => {
    async function loadThisCard() {
      try {
        const thisCard = await readCard(cardId);
        setCard(thisCard);
        setEditCardFormData({
          front: `${thisCard.front}`,
          back: `${thisCard.back}`,
          id: `${thisCard.id}`,
          deckId: Number(thisCard.deckId)
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
            <NavLink to={`/decks/deck.id`}>deck.name</NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <h2 className="text-left ml-5">Create Card</h2>
      <CardFormComponent
        submitCardFormHandler={submitEditCardFormHandler}
        handleCardInputChange={handleEditCardInputChange}
        cardFormData={editCardFormData}
        cancelCardHandler={cancelEditCardHandler}
      />
    </div>
  );
}

//access a form component that is separate, and make it have props that will be empty that in edit will be filled with actual card info
//use update card and make it just like update deck situation, and dont foget to give it an id for when it passes into updatecard
