import axios from 'axios';
import request from 'request';

const baseURL = 'http://10.19.193.10:80';
// const reader = new FileReader();
//
// const uploadImage = (imageBlob, cb) => {
//   reader.readAsBinaryString(imageBlob);
//   reader.onload = (e) => {
//     const media = e.target.result;
//     console.log(`state: ${reader.readyState}`);
//     console.log(media);
//     formData.append('media', media);
//     request.post({ url: `${baseURL}/post`, formData }, (err, response, body) => {
//       if (err) {
//         console.log(`failed: ${err}`);
//         return;
//       }
//       console.log(body);
//       cb(body);
//     });
//   };
// };

const uploadImageByDataURI = (dataURI, cb) => {
  const options = {
    uri: `${baseURL}/post`,
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Header': 'X-Custom-Header',
    },
    json: {
      imageURI: dataURI,
    },
  };
  request(options, (err, res, body) => {
    if (err) {
      console.log(`failed: ${err}`);
      return;
    }
    console.log(`${JSON.stringify(body)}`);
    cb(body);
  });
  // request.post({
  //   url: `${baseURL}/post`,
  //   form: { media: dataURI },
  // },
  // (err, response, body) => {
  //   if (err) {
  //     console.log(`failed: ${err}`);
  //     return;
  //   }
  //   console.log(body);
  //   cb(body);
  // });
};


export { uploadImageByDataURI };
