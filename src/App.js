import { useEffect, useState } from "react";
import DisplayAlbums from "./components/DisplayAlbums";
const URL="https://jsonplaceholder.typicode.com/albums"
function App() {
  let [data,setData]=useState([])
  useEffect(()=>{
    fetch(URL).then(res=>res.json()).then(data=>{setData(data)}).catch(e=>console.log(e))
  },[])
  return (
    <div className="App">
     <DisplayAlbums data={data}/>
    </div>
  );
}

export default App;
