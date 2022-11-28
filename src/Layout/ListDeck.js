import React from "react";
import { NavLink } from "react-router-dom";

export default function ListDeck({ deleteButtonHandler, decks }) {
  // set icon characters used in the buttons for easier readability in main function below
  const eyeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-eye-fill"
      viewBox="0 2 16 16"
    >
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg>
  );

  const studyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-journal-bookmark-fill"
      viewBox="1 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"
      />
      <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
      <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
    </svg>
  );

  const deleteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-trash-fill"
      viewBox="0 0 16 16"
    >
      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
    </svg>
  );

  //maps a card with buttons for each deck from the array passed in as a prop
  return decks.map((deck) => {
    return (
      <div key={`home-div-${deck.name}`} className="card mt-3">
        <div key="home-sub" className="card-body">
          <h5 key="deck-title" className="card-title d-flex align-items-center">
            {deck.name}
            <small key="cards-length-text" className="text-muted ml-auto">
              {deck.cards.length} cards
            </small>
          </h5>
          <p key="deck-description-text" className="card-text"> {deck.description}</p>
          <div key="deck-action-buttons" className="d-flex align-items-center">
            <NavLink to={""} key="view-button" role="button" className="btn btn-secondary mr-2">
              {eyeIcon}
              View
            </NavLink>
            <NavLink to={""} key="study-button" role="button" className="btn btn-primary mr-5">
              {studyIcon}
              Study
            </NavLink>
            <button
              key="delete-button"
              onClick={() => deleteButtonHandler(deck.name)}
              className="btn btn-danger ml-auto"
            >
              {deleteIcon}
            </button>
          </div>
        </div>
      </div>
    );
  });
}
