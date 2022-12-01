import React from "react";
import { useState, useEffect } from "react";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

export default function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const initialEditDeckFormState = {
    name: "",
    description: "",
  };
  const [editDeckFormData, setEditDeckFormData] = useState({
    ...initialEditDeckFormState,
  });

  useEffect(() => {
    async function loadThisDeck() {
      try {
        const thisDeck = await readDeck(deckId);
        setDeck(thisDeck);
        setEditDeckFormData({
          name: `${thisDeck.name}`,
          description: `${thisDeck.description}`,
          id: `${thisDeck.id}`,
        });
      } catch (error) {
        throw error;
      }
    }
    loadThisDeck();
  }, [deckId, setEditDeckFormData]);

  const handleEditDeckInputChange = ({ target }) => {
    setEditDeckFormData({
      ...editDeckFormData,
      [target.name]: target.value,
    });
  };

  const cancelEditDeckHandler = (event) => {
    history.push(`/decks/${deckId}`);
  };

  const submitEditDeckFormHandler = async (event) => {
    event.preventDefault();
    await updateDeck(editDeckFormData);
    setEditDeckFormData({ ...initialEditDeckFormState });
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
            Edit
          </li>
        </ol>
      </nav>
      <h2 className="text-left ml-5">Edit Deck</h2>
      <form onSubmit={submitEditDeckFormHandler} className="ml-5 mr-5">
        <div className="form-group mt-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            // placeholder={deck.name}
            onChange={handleEditDeckInputChange}
            value={editDeckFormData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            // placeholder={deck.description}
            onChange={handleEditDeckInputChange}
            value={editDeckFormData.description}
          ></textarea>
        </div>
        <button
          type="cancel"
          className="btn btn-secondary mb-2 mr-2"
          onClick={cancelEditDeckHandler}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mb-2">
          Submit
        </button>
      </form>
    </div>
  );
}
