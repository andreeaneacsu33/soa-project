import React, {lazy, useState} from "react";
import Login from "./Login";
import {Box, Button, Grommet} from "grommet";
import {grommet} from "grommet/themes";
import "./index.css"

const BooksComponent = lazy(
    () => import('Books/BooksComponent')
);

let component;

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const logout = () => {
    console.log('logout');
    const url_api = 'http://localhost:8092/urest/v1/logout';
    console.log(`sending request: ${url_api}`);

    console.log(token);

    fetch(url_api,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "username": username
      })
    }).then(response => response.json())
        .then(data => {
          const api_error = data.error;
          if(typeof api_error == 'undefined'){
            console.log("Logout success.");
            setUsername({username: ''});
            setIsLoggedIn({ isLoggedIn: false });
          } else {
            console.log(api_error);
            alert(api_error);
          }
        }).catch((err) => {
      console.log(`Error API call: ${err}`);
      alert(error);
    });
  }

    if (isLoggedIn) {
      component = (
          <Box>
            <React.Suspense fallback="Loading Books">
              <BooksComponent/>
            </React.Suspense>
            <Box style={{alignItems:"center", marginTop: "23px"}} className='logout'>
              <Button onClick={() => logout()}>Logout</Button>
            </Box>
          </Box>
      )
    } else {
      component = (<Login
          loginSuccess={() => setIsLoggedIn({ isLoggedIn: true })}
          setUser={(usr) => setUsername({username: usr})}
          setToken={(tkn) => setToken({token: tkn})}
      />)
    }

    return (
        <Grommet full theme={grommet}>
          {component}
        </Grommet>
    )
}

export default App;
