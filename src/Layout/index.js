import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api";
import Home from "./Home";

function Layout() {
  //state declarations
  const [decks, setDecks] = useState([]);

  //this uses an api call in utils to retreive all decks and sets the decks variable for use in <Home /> and it's child component <ListDeck />
  useEffect(() => {
    async function loadDecks() {
      try {
        const allDecks = await listDecks();
        setDecks(allDecks);
      } catch (error) {
        throw error;
      }
    }
    loadDecks();
  }, [setDecks]);

  //for use when user clicks on the delete button in <Home /> -> <ListDeck />
  const deleteButtonHandler = (deckContent) => {
    if (
      window.confirm("Delete this deck? \n You will not be able to recover it")
    ) {
      setDecks(decks.filter((deck) => deck.name !== deckContent))
    }
  };

  return (
    <>
      <Header />
      {/* TODO: Implement the screen starting here */}
      <Switch>
        <Route exact path={"/"}>
          <Home decks={decks} deleteButtonHandler={deleteButtonHandler} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default Layout;
