import React, { useEffect } from "react";

function App() {
  async function getCookie() {
    let res = await fetch("/api");
    res = await res.json();
    console.log(res);
  }

  useEffect(() => {
    getCookie();
  }, []);

  return <div className="App">App</div>;
}

export default App;
