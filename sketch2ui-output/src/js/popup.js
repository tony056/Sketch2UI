import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';


const sendToContentScript = (frameData) => {
  chrome.tabs.query({
    active: true,
    currentWindow: true,
  }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        isNew: true,
        data: frameData,
      },
      response => console.log('frame data sent to Figma.')
    )
  });
};

ReactDOM.render(<App sendToContentScript={sendToContentScript} />, document.getElementById('container'));
