import './App.css';
import Books from "./Books";
import {grommet} from "grommet/themes";
import {Grommet} from "grommet";

function App() {
  return (
      <Grommet full theme={grommet}>
          <Books/>
      </Grommet>
  );
}

export default App;
