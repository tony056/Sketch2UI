export default function cleanBase64Data(canvasDataURL) {
  return canvasDataURL.replace(/^data:image\/\w+;base64,/, '');
}
