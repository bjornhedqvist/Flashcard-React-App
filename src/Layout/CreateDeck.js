import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, NavLink } from "react-router-dom";

export default function CreateDeck({ handleCreateDeckInputChange, submitCreateDeckFormHandler, cancelCreateDeckHandler, createDeckFormData }) {
  return (
    <div>
      <nav aria-label="breadcrumb" className="ml-5 mr-5">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <NavLink to={"/"}>
              <span className="oi oi-home mr-1"></span>Home
            </NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2 className="text-left ml-5">Create Deck</h2>
      <form onSubmit={submitCreateDeckFormHandler} className="ml-5 mr-5">
        <div className="form-group mt-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck name"
            onChange={handleCreateDeckInputChange}
            value={createDeckFormData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            placeholder="Brief description of the deck"
            onChange={handleCreateDeckInputChange}
            value={createDeckFormData.description}
          ></textarea>
        </div>
        <button
          type="cancel"
          className="btn btn-secondary mb-2 mr-2"
          onClick={cancelCreateDeckHandler}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
