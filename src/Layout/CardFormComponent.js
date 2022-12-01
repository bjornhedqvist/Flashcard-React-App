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

export default function CardFormComponent({submitCardFormHandler, handleCardInputChange, cardFormData, cancelCardHandler}){

    return (
        <form onSubmit={submitCardFormHandler} className="ml-5 mr-5">
        <div className="form-group mt-2">
          <label htmlFor="front">Front</label>
          <input
            type="text"
            className="form-control"
            id="front"
            name="front"
            placeholder="Front side of card"
            onChange={handleCardInputChange}
            value={cardFormData.front}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="4"
            placeholder="Back side of card"
            onChange={handleCardInputChange}
            value={cardFormData.back}
          ></textarea>
        </div>
        <button
          type="cancel"
          className="btn btn-secondary mb-2 mr-2"
          onClick={cancelCardHandler}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mb-2">
          Submit
        </button>
      </form>
    )
}