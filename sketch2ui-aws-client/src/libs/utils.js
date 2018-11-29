/* global window, Blob */

function dataURItoBlob(dataURI) {
  const decoded = window.atob(dataURI.split(',')[1]);
  const array = [];
  for (let i = 0; i < decoded.length; i += 1) {
    array.push(decoded.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
}


const exampleImageSrc = {
  Icon: [
    'https://i.imgur.com/dU26Ih9.jpg',
    'https://i.imgur.com/Wt5BFx7.jpg',
    'https://i.imgur.com/xjNcTTR.jpg',
    'https://i.imgur.com/jkvimtv.jpg',
    'https://i.imgur.com/k98eZ2C.jpg',
    'https://i.imgur.com/4cwxmZz.jpg',
    'https://i.imgur.com/qpNAbeZ.jpg',
    'https://i.imgur.com/ZREchvw.jpg',
  ],
  'Pager-indicator': [
    'https://s2.gifyu.com/images/class_0_1228da5e7870bcb8d.gif',
    'https://s2.gifyu.com/images/class_2_3897cf87194e6126b.gif',
    'https://s2.gifyu.com/images/class_4_5ded8c227192e458e.gif',
    'https://s2.gifyu.com/images/class_6_71983d1327900949e.gif',
    'https://s2.gifyu.com/images/class_10_11.gif',
    'https://s2.gifyu.com/images/class_12_13.gif',
    'https://s2.gifyu.com/images/class_14_15.gif',
    'https://s2.gifyu.com/images/class_16_17.gif',
    'https://s2.gifyu.com/images/class_18_19.gif',
    'https://s2.gifyu.com/images/class_8_9214079d7329e5135.gif',
  ],
  Slider: [
    'https://s2.gifyu.com/images/class_0_1.gif',
    'https://s2.gifyu.com/images/class_2_3.md.gif',
    'https://s2.gifyu.com/images/class_4_5.md.gif',
    'https://s2.gifyu.com/images/class_6_7.gif',
    'https://s2.gifyu.com/images/class_8_9.md.gif',
  ],
};

function getExampleImageSrc(task, count, targetNumber) {
  const base = Math.floor(targetNumber / exampleImageSrc[task].length);
  const index = Math.floor(count / base);
  return exampleImageSrc[task][index];
}

export { dataURItoBlob, getExampleImageSrc };
