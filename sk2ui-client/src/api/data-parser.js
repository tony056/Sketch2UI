/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
/* eslint camelcase: ["error", {"properties": "never",  ignoreDestructuring: true}] */
const IMAGE_API = 'api/images?id=';
export function simplifyAttrData(objects, cb) {
  if (!Array.isArray(objects)) {
    console.log('data cannot be parsed');
    return;
  }
  const data = objects.map((obj) => {
    const newObj = Object.assign({}, obj);
    Object.entries(obj).forEach((pair) => {
      if (Array.isArray(pair[1])) {
        newObj[`${pair[0]}_cnt`] = pair[1].length;
      }
    });
    return newObj;
  });
  cb(data);
}

export function getImageSourcesPerData(data) {
  // const { rico_image_file, rico_anno_image_file } = data;
  return [{
    alt: 'rico image',
    url: `${IMAGE_API}${data._id.$oid}&arg=rico`,
  }, {
    alt: 'rico anno image',
    url: `${IMAGE_API}${data._id.$oid}&arg=anno`,
  }];
}

export function getDataId(data) {
  return data._id.$oid;
}

export function getRicoLabels(data) {
  const pairs = Object.entries(data);
  const content = [];
  pairs.forEach((pair) => {
    const key = pair[0];
    if (key.includes('_') && !key.includes('file') && !key.includes('cnt') && key !== '_id') {
      content.push(pair);
    }
  });
  return content;
}

export function getRicoImages(dataList) {
  return dataList.map(data => ({
    alt: `rico id: ${data._id}`,
    url: `${IMAGE_API}${data._id.$oid}&arg=rico`,
  }));
}
