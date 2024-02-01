import React, { useState, useEffect } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);
  const url = 'http://localhost/educom/tohabit/server/mobile/list/'
  
   useEffect(() => {
      fetch(url)
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log("Fetch error:", err);
         });
   }, []);

  return (
    <div className="App">
      <h1>{posts[1]}</h1>
      
    </div>
  );
}



export default App;
