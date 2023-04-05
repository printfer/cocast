import ReactDOM from "react-dom/client";
import App from "./App";

//const WebTorrent = require("webtorrent/webtorrent.min.js")
//
//const client = new WebTorrent()
//const magnetURI = ""
//
//client.add(magnetURI, function (torrent) {
//  // Got torrent metadata!
//  console.log("Client is downloading:", torrent.infoHash)
//
//  torrent.files.forEach(function (file) {
//    // Display the file by appending it to the DOM. Supports video, audio, images, and
//    // more. Specify a container element (CSS selector or reference to DOM node).
//    file.appendTo("body")
//  })
//})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<React.StrictMode>
  //  <App />
  //</React.StrictMode>
  <App />
);
