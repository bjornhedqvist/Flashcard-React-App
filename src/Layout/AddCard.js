import React from "react";
import { useState, useEffect } from "react";
import {
  useHistory,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardFormComponent from "./CardFormComponent";

export default function AddCard() {
  const { params } = useRouteMatch();
  const [deck, setDeck] = useState({});
  const history = useHistory();

  const initialCreateCardFormState = {
    front: "",
    back: "",
  };
  const [createCardFormData, setCreateCardFormData] = useState({
    ...initialCreateCardFormState,
  });

  useEffect(() => {
    async function loadThisDeck() {
      try {
        const thisDeck = await readDeck(params.deckId);
        setDeck(thisDeck);
      } catch (error) {
        throw error;
      }
    }
    loadThisDeck();
  }, [params.deckId]);

  const handleCreateCardInputChange = ({ target }) => {
    setCreateCardFormData({
      ...createCardFormData,
      [target.name]: target.value,
    });
  };

  const submitCreateCardFormHandler = async (event) => {
    event.preventDefault();
    await createCard(params.deckId, createCardFormData);
    setCreateCardFormData({ ...initialCreateCardFormState });
    history.push(`/decks/${params.deckId}`);
  };

  const cancelCreateCardHandler = (event) => {
    history.push("/");
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
            Add Card
          </li>
        </ol>
      </nav>
      <h2 className="text-left ml-5">{deck.name}: Add Card</h2>
      <CardFormComponent submitCardFormHandler={submitCreateCardFormHandler} handleCardInputChange={handleCreateCardInputChange} cardFormData={createCardFormData} cancelCardHandler={cancelCreateCardHandler}/>
    </div>
  );
}

//get deck with read deck, that deck should be the one with the id in the url above (useparams?)
//access a form component that is separate, and make it have props that will be empty that in edit will be filled with actual card info
//use createCard and mimic create deck
