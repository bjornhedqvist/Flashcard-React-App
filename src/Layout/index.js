import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks, createDeck, deleteDeck } from "../utils/api";
import Home from "./Home";
import Study from "./Study";
import CreateDeck from "./CreateDeck";

function Layout() {
  //state declarations
  const [decks, setDecks] = useState([]);
  const history = useHistory();
  const initialCreateDeckFormState = {
    name: "",
    description: "",
  };
  const [createDeckFormData, setCreateDeckFormData] = useState({ ...initialCreateDeckFormState }); 

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
  const deleteButtonHandler = (deckContent) => {
    if (
      window.confirm(
        "Delete this deck? \n \n You will not be able to recover it"
      )
    ) {
      deleteDeck(deckContent)
      const newDecks = decks.filter((deck) => deck.id !== deckContent)
      setDecks(newDecks)
    }
  };

//handles input and submission and cancel of the Create Deck form
    const handleCreateDeckInputChange = ({ target }) => {
      setCreateDeckFormData({
        ...createDeckFormData,
        [target.name]: target.value,
      });
    };
  
    const submitCreateDeckFormHandler = (event) => {
      event.preventDefault();
      createDeck(createDeckFormData)
      setCreateDeckFormData({ ...initialCreateDeckFormState });
      history.push("/deck/:deckId")
    };
    
    const cancelCreateDeckHandler = (event) => {
    history.push("/")
  }

    //Return the layout of the app, with child components and route paths defined

  return (
    <>
      <Header />
      {/* TODO: Implement the screen starting here */}
      <Switch>
        <Route exact path={"/"}>
          <Home decks={decks} deleteButtonHandler={deleteButtonHandler} />
        </Route>

        <Route path={"/decks/new"}>
          <CreateDeck handleCreateDeckInputChange={handleCreateDeckInputChange} submitCreateDeckFormHandler={submitCreateDeckFormHandler} cancelCreateDeckHandler={cancelCreateDeckHandler} createDeckFormData={createDeckFormData} />
        </Route>
        <Route exact path={"/decks/:deckId"}>

        </Route>
        <Route path={"/decks/:deckId/study"}>
          <Study decks={decks} />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default Layout;
