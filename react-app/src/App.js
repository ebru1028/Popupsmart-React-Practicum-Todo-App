import "./css/app.css";

import React, { useState } from "react";
import Layout from './components/layouth/layouth';
import HomePage from './pages/homePage';

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <>
       <Layout theme={theme}>
        <HomePage setTheme={setTheme} />
      </Layout>
    </>
  );
}

export default App;
