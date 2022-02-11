import React from 'react';
import './App.css';
import BooksComponent from "./BooksComponent";
import {grommet, Grommet} from "grommet";
import "./index.css"

function App() {
  return (
      <Grommet full theme={grommet}>
        <BooksComponent/>
      </Grommet>
  );
}

export default App;
