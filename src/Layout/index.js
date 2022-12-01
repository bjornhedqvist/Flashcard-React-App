import React from "react";
import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks, createDeck, deleteDeck } from "../utils/api";
import Home from "./Home";
import Study from "./Study";
import CreateDeck from "./CreateDeck";
import ViewDeck from "./ViewDeck";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import AddCard from "./AddCard";

function Layout() {
  //state declarations
  const matchY = useRouteMatch();
  const [decks, setDecks] = useState([]);
  const history = useHistory();
  const initialCreateDeckFormState = {
    name: "",
    description: "",
  };
  const [createDeckFormData, setCreateDeckFormData] = useState({
    ...initialCreateDeckFormState,
  });

  //this uses an api call in utils to retreive all decks and sets the decks variable for use in <Home /> and its child component <ListDeck />
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
  const deleteDeckButtonHandler = async (deckContent) => {
    if (
      window.confirm(
        "Delete this deck? \n \n You will not be able to recover it"
      )
    ) {
      await deleteDeck(deckContent);
      // DONT DO THIS PEEPS: const newDecks = decks.filter((deck) => deck.id !== deckContent);  DO WHATS BELOW and add async await above
      listDecks().then(setDecks);
      history.push(`/`);
    }
  };

  //handles input and submission and cancel of the Create Deck form
  const handleCreateDeckInputChange = ({ target }) => {
    setCreateDeckFormData({
      ...createDeckFormData,
      [target.name]: target.value,
    });
  };

  const submitCreateDeckFormHandler = async (event) => {
    event.preventDefault();
    const createdDeck = await createDeck(createDeckFormData);
    setCreateDeckFormData({ ...initialCreateDeckFormState });
    history.push(`/decks/${createdDeck.id}`);
  };

  const cancelCreateDeckHandler = (event) => {
    history.push("/");
  };

  //handles input and submission and cancel of the Edit Deck form

  //Return the layout of the app, with child components and route paths defined
  return (
    <>
      <Header />
      {/* TODO: Implement the screen starting here */}
      <Switch>
        <Route exact path="/">
          <Home
            decks={decks}
            deleteDeckButtonHandler={deleteDeckButtonHandler}
          />
        </Route>
        <Route exact path="/decks/new">
          <CreateDeck
            handleCreateDeckInputChange={handleCreateDeckInputChange}
            submitCreateDeckFormHandler={submitCreateDeckFormHandler}
            cancelCreateDeckHandler={cancelCreateDeckHandler}
            createDeckFormData={createDeckFormData}
          />
        </Route>
        <Route exact path="/decks/:deckId">
          <ViewDeck deleteDeckButtonHandler={deleteDeckButtonHandler} />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route exact path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
          <Route exact path={`/decks/:deckId/cards/new`}>
            <AddCard />
          </Route>
        <Route exact path={`/decks/:deckId/cards/:cardId/edit`}>
            <EditCard />
          </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default Layout;
