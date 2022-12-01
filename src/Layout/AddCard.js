import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, useHistory, useParams, useRouteMatch } from "react-router-dom";

export default function AddCard(){
    return(
        <p>add</p>
    )
}

//get deck with read deck, that deck should be the one with the id in the url above (useparams?)
//access a form component that is separate, and make it have props that will be empty that in edit will be filled with actual card info 
//use createCard and mimic create deck