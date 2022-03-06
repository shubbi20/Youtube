import React from "react"
import { FooterBox } from "./footer"

export const MiddleBox=()=>{
   return(
       <>
       <div className="middle">
           <div className="middleInner">
           <h1 style={{fontSize:"3em" }}>Welcome to YtDownloader</h1>
           <h1 style={{marginTop:'0.5em'}}>Using this downloader is the fast and easy way to download and
                 save any YouTube video to MP3 or MP4. Simply copy YouTube URL, paste it on the search box
                 ,press the submit button</h1>
           </div>  
       </div>
       <FooterBox/>
       </>
   )
}