window.onload = () => {
  const $startButton = document.querySelector('.start');
  $startButton.onclick = () => {
    console.log('button clicked');
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id, { injectApp: true }, response => window.close()
      );
    });
  };
};
