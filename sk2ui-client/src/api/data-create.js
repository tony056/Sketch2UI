/* global fetch */
import cleanBase64Data from '../utils/utils';

const CREATE_URL = '/api/add';

export default function saveLabelSketch(fileName, label, data) {
  fetch(`${CREATE_URL}/labelsketch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: fileName,
      image: cleanBase64Data(data),
      label,
    }),
  }).then(() => { console.log('got response'); });
}
