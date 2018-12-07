
const injectJS = (filePath, tag) => {
  const node = document.getElementByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', filePath);
  node.append(script);
};

export default injectJS;
