/* global fetch */
import { simplifyAttrData, getRicoImages } from './data-parser';

const QUERY_URL = '/api/query';
const CONSTANT_URL = '/api/fetch';

export const fetchAll = (cb) => {
  fetch(QUERY_URL)
    .then(response => response.json())
    .then(jsonStr => simplifyAttrData(JSON.parse(jsonStr), cb))
    .catch(err => console.error(err));
};

export const fetchByName = (qryStr, cb) => {
  fetch(`${QUERY_URL}?name=${qryStr}`)
    .then(response => response.json())
    .then(jsonStr => simplifyAttrData(JSON.parse(jsonStr), cb))
    .catch(err => console.error(err));
};

export const fetchSampleImageURLs = (label, count, cb) => {
  fetch(`${QUERY_URL}?ricolabel=${label}&limit=${count}`)
    .then(res => res.json())
    .then(jsonStr => getRicoImages(JSON.parse(jsonStr)))
    .then(imageURLs => cb(imageURLs))
    .catch(err => console.error(err));
};

export const fetchRicoLabels = (cb) => {
  fetch(`${CONSTANT_URL}?arg=label&type=rico`)
    .then(res => res.json())
    .then(labels => cb(labels.concat([''])))
    .catch(err => console.error(err));
};
