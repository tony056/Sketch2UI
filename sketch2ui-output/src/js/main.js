import Sketch2UI from './plugin';

let instance = null;
const injectApp = () => {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', chrome.extension.getURL('/src/build/inject.js'));
  document.body.appendChild(script);
};

const create = () => {
  const event = new CustomEvent('skNewData', {detail: {data: fake}});
  window.dispatchEvent(event);
  console.log('dispatchEvent');
};

injectApp();

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.injectApp) {
    console.log('inject msg.....');
    create();
    response({
      startedExtension: true,
    });
  }
});

const fake = {
  frameId: '909090',
  lowLevelComps: [
    {
      "name": "Icon",
      "bbox": [
        1270,
        87,
        170,
        173
      ]
    },
    {
      "name": "Icon",
      "bbox": [
        1100,
        84,
        174,
        176
      ]
    },
    {
      "name": "Images",
      "bbox": [
        49,
        115,
        120,
        120
      ]
    },
    {
      "name": "Images",
      "bbox": [
        6,
        270,
        1410,
        2127
      ]
    },
    {
      "name": "Text",
      "bbox": [
        207,
        87,
        829,
        172
      ]
    }
  ],
  highLevelComps: [
    {
      "name": "Card",
      "bbox": [
        21,
        231,
        1419,
        2130
      ]
    },
    {
      "name": "Modal",
      "bbox": [
        7,
        222,
        1400,
        2150
      ]
    }
  ]
}
