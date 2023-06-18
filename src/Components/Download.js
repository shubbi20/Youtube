import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom"
import axios from "axios";
import "./../index.css";
import Chip from "@material-ui/core/Chip";
import Loader from "./loader";

export function Download() {
  // function useQuery() {
  //   return new URLSearchParams(useLocation.search);
  // }

  function getURL() {
    let pathurl = window.location.search;
    let stringurl = pathurl.substring(5);
    return stringurl;
  }

  // let query = useQuery();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("Loading");
  const [thumbnail, setThumbnail] = useState("");
  const [formats, setFormats] = useState();
  const [audioFormats, setAudioFormats] = useState();
  const [loader, setLoader] = useState(true);

  async function fetchData() {
    const str = getURL();
    setUrl(str);
    console.log(str);
    const uTubeVideo = await axios.get(
      `https://youtube-backend-8xm4.onrender.com/video?videoId=${str}`
    );
    //https://yt-downloader-backend.herokuapp.com

    if (uTubeVideo) {
      setTitle(uTubeVideo.data.videoDetails.title);
      setThumbnail(
        uTubeVideo.data.videoDetails.thumbnails[
          uTubeVideo.data.videoDetails.thumbnails.length - 1
        ].url
      );
      //console.log(uTubeVideo.data.videoDetails.thumbnails[uTubeVideo.data.videoDetails.thumbnails.length - 1].url);
      setFormats(uTubeVideo.data.formats);
      setLoader(false);
    }
  }

  async function fetchAudio() {
    const str1 = getURL();
    const uTubeAudio = await axios.get(
      `https://youtube-backend-8xm4.onrender.com/audio?videoId=${str1}`
    );
    if (uTubeAudio) {
      setAudioFormats(uTubeAudio.data);
    }
  }

  useEffect(() => {
    fetchData().catch(console.error);
    fetchAudio().catch(console.error);
  }, [window.location.search]);

  const downloadFile = (itag, type) => {
    window.open(
      `https://youtube-backend-8xm4.onrender.com/download?title=${title}&videoId=${url}&type=${
        type ? "mp4" : "mp3"
      }&itag=${itag}`
    );
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="download_Section">
          <div className="thumbnail">
            <img src={thumbnail} />
          </div>
          <h1 className="DownloadSection">{title}</h1>
          <hr />

          <div className="DownloadSection">
            <h1>Video</h1>
            {formats &&
              formats.map((format, index) =>
                format.qualityLabel === null ? (
                  ""
                ) : format.hasAudio === true ? (
                  <Chip
                    className="chip"
                    label={format.qualityLabel}
                    onClick={() => {
                      downloadFile(format.itag, format.hasVideo);
                    }}
                    key={index}
                    style={{
                      margin: "0rem 0.8rem 0.8rem 1rem",
                      cursor: "pointer",
                      backgroundColor: "red",
                      color: "#fff",
                    }}
                  />
                ) : (
                  ""
                )
              )}
          </div>

          <div className="DownloadSection">
            <h1>Audio</h1>
            {audioFormats &&
              audioFormats.map((format, index) => (
                <Chip
                  className="chip"
                  label={
                    format.mimeType.split(";")[0] === "audio/mp4"
                      ? "audio/mp3"
                      : format.mimeType.split(";")[0]
                  }
                  onClick={() => {
                    downloadFile(format.itag, format.hasVideo);
                  }}
                  key={index}
                  style={{
                    margin: "0rem 0.8rem 0.8rem 1rem",
                    cursor: "pointer",
                    backgroundColor: "red",
                    color: "#fff",
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
