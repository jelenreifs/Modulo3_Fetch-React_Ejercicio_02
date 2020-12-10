import { BrowserRouter, Link, Route, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';

function Planeta() { 
  let { index } = useParams();

  //const [planeta, setPlaneta] = useState([]); 
  const [url, setUrl] = useState(`https://swapi.dev/api/planets/${index}`);
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  

    useEffect(() => {
    setIsloading(true);
    fetch(url)
      .then(function (results) {
        return results.json();
      })
      .then(function (data) {
        console.log(data)
        setData(data);
        setIsloading(false);
      });
    }, [url]);
  
  
    if (isLoading) {
    return <div>Loading...</div>
  } else {
      return (
       <>
      <h1>{data.name}</h1>
      <p>{data.created}</p>
      <p>{data.edited}</p>
   </>
    )
  } 
  
}


function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const [index, setIndex] = useState(1);
  const [url, setUrl] = useState(`https://swapi.dev/api/planets/`);

  
    useEffect(() => {
    setIsloading(true);
    fetch(url)
      .then(function (results) {
        return results.json();
      })
      .then(function (data) {
        console.log(data)
        setData(data.results);
        setIsloading(false);
      });
  },[url]);
  

  function valorSelect(e) {
  setIndex(e.target.value)
  } 
  

   const selectPlanetas = data.map((planetas,index) => {
     return (
       <option key={index} value={index+1} onChange={valorSelect} >
           {planetas.name}
        </option>
    )
   })
  
  
     const mostrarPlanetas = data.map((planetas,index) => {
     return (
       <h4 key={index}> {planetas.name} </h4>
    )
   })
  
  if (isLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <BrowserRouter>
        <header>
           <Link exact to={`/${index}`}>
              <select> {selectPlanetas} </select>
           </Link>
        </header>
       <Link exact to={`/${index}`}>
               {mostrarPlanetas} 
           </Link>
      
        <Route exact path="/">
¡        </Route>

        <Route exact path="/:index">
          <Planeta />
        </Route>
        
      </BrowserRouter>
    )
  } 
}

export default App;
