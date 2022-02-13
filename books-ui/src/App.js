import React from 'react';
import './App.css';
import BooksComponent from "./BooksComponent";
import {grommet, Grommet} from "grommet";
import "./index.css"

function App() {
  return (
      <Grommet full theme={grommet}>
        <BooksComponent
            token='aa'
            username='usr0'
        />
      </Grommet>
  );
}

export default App;
