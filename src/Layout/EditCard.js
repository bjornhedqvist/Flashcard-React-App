import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, useHistory, useParams, useRouteMatch } from "react-router-dom";

export default function EditCard(){
    return(
        <p>edit</p>
    )
}


//access a form component that is separate, and make it have props that will be empty that in edit will be filled with actual card info 
//use update card and make it just like update deck situation, and dont foget to give it an id for when it passes into updatecard