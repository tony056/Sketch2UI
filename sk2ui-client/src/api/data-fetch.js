/* global fetch */
import { simplifyAttrData } from './data-parser';

const QUERY_URL = '/api/query';

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
