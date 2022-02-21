import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AiFillYoutube } from "react-icons/ai";
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Download } from './Components/Download';


export function App() {
  let navigate = useNavigate();
  const [url, setUrl] = useState('');
  let parsedUrl = new URL(window.location);

  let query = useQuery();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function changeUrl(event) {
    event.preventDefault();
    setUrl(event.target.value);
  }

  useEffect(() => {
    if (window.location.pathname === "/") {
      setUrl("")
    } else {
      setUrl(query.get("url"))

    }
  }, [window.location.pathname])

  function handleSubmit() {
    if (url === ' ' || !url.includes('https') || !url.includes('yout')) {
      alert('type the valid url');
    } else {
      if (url.includes("www")) {
        navigate(`/download?url=${url.replace("www.", "")}`)
      } else {
        navigate(`/download?url=${url}`)
      }
    }
  }

  return (
    <div className='box'>
      <div className='topSection'>
        <div className='utubeText' onClick={() => navigate("/")}>Youtube Downloader <AiFillYoutube /></div>
        <input type="text" className='textsec' placeholder='type here' value={url} onChange={changeUrl} ></input>
        <input type='submit' value='Download' className='textsubmit' onClick={handleSubmit}></input>
      </div>
      <Routes>
        <Route path="/download" element={<Download />} />
      </Routes>
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root')
);


