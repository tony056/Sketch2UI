const paddingX = 2;
const paddingY = 2;
class Region {
  constructor(bbox) {
    this.x = [bbox[0], bbox[0] + bbox[2]];
    this.y = [bbox[1], bbox[1] + bbox[3]];
  }

  isInRange(r1, r2) {
    const min = r1[0] < r2[0] ? r1 : r2;
    const max = min[0] === r1[0] ? r2 : r1;
    if (min[1] < max[0])
      return false;
    return true;
  }

  isInRegion(region) {
    const { x, y } = region;
    if (this.isInRange(x, this.x) && this.isInRange(y, this.y)) {
      return true;
    }
    return false;
  }
}

function Component(exist, children) {
  this.exist = exist;
  this.children = children;
}
const barCompSet = new Set(['Images', 'Icon', 'Text', 'Button']);
const bottomCompSet = new Set(['Icon', 'Text', 'Button']);
const topLeftRegion = new Region([0, 0, 120, 60]);
const topRightRegion = new Region([240, 0, 120, 60]);
const bottomRegion = new Region([0, 540, 360, 100]);


const getQuadrant = (px, py, pw, ph, cx, cy) => {
  const ox = px + Math.floor(pw / 2);
  const oy = py + Math.floor(ph / 2);
  const extra = (cy >= oy) ? 2 : 0;
  if (cx >= ox && cx < px + pw) {
    // in quadrant 1, 3
    return 1 + extra;
  } else if (cx > px && cx < ox) {
    // in quadrant 2, 4
    return 2 + extra;
  }
  return -1;
};

const isOverlapped = (px, py, pw, ph, cx, cy, cw, ch) => {
  const nx = px + pw;
  const ny = py + ph;
  const isXIntersect = intersection([px, px + pw], [cx, cx + cw]);
  const isYIntersect = intersection([py, py + ph], [cy, cy + ch]);
  return isXIntersect && isYIntersect;
}

const intersection = (r1, r2) => {
  const minR = r1[0] < r2[0] ? r1 : r2;
  const maxR = (minR === r1) ? r2 : r1;
  if (minR[1] < maxR[0]) {
    return false;
  }
  return true;
}

const splitTwoComp = (prevComp, curComp) => {
  const [px, py, pw, ph] = prevComp.bbox;
  const [cx, cy, cw, ch] = curComp.bbox;
  const { name } = curComp;
  if (!isOverlapped(px, py, pw, ph, cx, cy, cw, ch))
    return curComp;
  const quad = getQuadrant(px, py, pw, ph, cx, cy);
  if (prevComp.name === name && (quad === 3 || quad === 4)) {
    return null;
  }
  let newComp = {
    name,
    bbox: []
  };
  console.log(`split: ${prevComp.name}, ${curComp.name}, ${quad}`);
  let newX = cx;
  let newY = cy;
  switch (quad) {
    case 1:
      newX = px + pw + paddingX;
      break;
    case 2:
      newX = px + pw + paddingX;
      newY = py;
      break;
    case 3:
      newY = py + ph + paddingY;
      break;
    case 4:
      newY = py + ph + paddingY;
      newX = px;
    default:
      console.log('no overlap');
      break;
  }
  newComp.bbox.push(newX);
  newComp.bbox.push(newY);
  newComp.bbox.push(cw);
  newComp.bbox.push(ch);
  console.log(`newComp: ${JSON.stringify(newComp)}`);
  return newComp;
};

const sortByXY = (a, b) => {
  const [ax, ay, aw, ah] = a.bbox;
  const [bx, by, bw, bh] = b.bbox;
  if (ax === bx) {
    return ay - by;
  }
  return ax - bx;
};

const sortByYX = (a, b) => {
  const [ax, ay, aw, ah] = a.bbox;
  const [bx, by, bw, bh] = b.bbox;
  if (ay === by) {
    return ax - bx;
  }
  return ay - by;
}

const resolveOverlapping = (comps) => {
  const sComps = [...comps];
  sComps.sort(sortByXY);
  let newComps = [];
  let prevComp = null;
  sComps.forEach(comp => {
    // if (newComps.length === 0) {
    //   newComps.push(comp);
    //   return;
    // }
    if (prevComp)
      console.log(`prev: ${prevComp.name}, ${comp.name}`);
    // console.log(`prevComp == ${prevComp === null}`);
    const newComp = prevComp === null ? comp : splitTwoComp(prevComp, comp);
    console.assert(newComp !== undefined, { comp: comp, errorMsg: 'the comp in undefined' });
    prevComp = Object.assign({}, comp);
    if (newComp)
      newComps.push(Object.assign({}, newComp));
  });
  return newComps;
};


const BottomNavigationDetector = comps => {

}

const postProcessor = comps => {
  comps.sort(sortByXY);
  let toolBar = {
    exist: false,
    tlComps: [],
    trComps: []
  };
  let bottomNavigation = {
    exist: false,
    comps: []
  };
  let restComps = [...comps];
  // comps.forEach(comp => {
  //   const { name, bbox } = comp;
  //   if (!barCompSet.has(name) && !bottomCompSet.has(name)) {
  //     restComps.push(comp);
  //     return;
  //   }
  //   const [x, y, w, h] = bbox;
  //   const region = new Region(bbox);
  //   const tlCount = toolBar.tlComps.length;
  //   const trCount = toolBar.trComps.length;
  //   if (topLeftRegion.isInRegion(region)) {
  //     toolBar.tlComps.push(comp);
  //   } else if (topRightRegion.isInRegion(region)) {
  //     toolBar.trComps.push(comp);
  //   } else if (bottomRegion.isInRegion(region)) {
  //     bottomNavigation.comps.push(comp);
  //   } else {
  //     restComps.push(comp);
  //   }
  // });
  // toolBar.exist = toolBar.tlComps.length > 0 && toolBar.trComps.length > 0;
  // bottomNavigation.exist = bottomNavigation.comps.length > 0;
  // //console.log(`toolBar: ${toolBar.exist} ${toolBar.tlComps.length}`);
  // //console.log(`bottom: ${bottomNavigation.exist} ${bottomNavigation.comps.length}`);
  // restComps = alignCompsByClosingX(comps);
  // restComps = alignCompsByClosingX(restComps);
  // restComps = alignCompsByClosingY(restComps);
  // console.log(JSON.stringify(restComps));
  // return { toolBar, bottomNavigation, restComps };
  return { toolBar, bottomNavigation, restComps };
};

const alignCompsByClosingY = comps => {
  let i = 0;
  let temps = [...comps];
  temps.sort(sortByYX);
  while (i < temps.length) {
    const [x, y, w, h] = temps[i].bbox;
    let j = i + 1;
    let tempSum = y + Math.floor(h / 2);
    while (j < temps.length) {
      const [jx, jy, jw, jh] = temps[j].bbox;
      const my = jy + Math.floor(jh / 2);
      if (my >= y && my < y + h) {
        j += 1;
        tempSum += my;
      } else {
        break;
      }
    }
    const newY = Math.floor(tempSum / (j - i + 1));
    console.log(`y range: ${i}, ${j}, ${newY}`);
    for (let a = i; a < j; a++) {
      temps[a].bbox[1] = newY;
    }
    i = j;
  }
  return temps;
};

const alignCompsByY = comps => {
  let newComps = [];
  let tempComps = [...comps];
  tempComps.sort((a, b) => {
    const [ax, ay, aw, ah] = a.bbox;
    const [bx, by, bw, bh] = b.bbox;
    return (ay + Math.floor(ah / 2)) - (by + Math.floor(bh / 2));
  });
  const mid = Math.floor(tempComps.length / 2);
  const midY = tempComps[mid].bbox[1] + Math.floor(tempComps[mid].bbox[3] / 2);
  tempComps.forEach((cp, i) => {
    const [x, y, w, h] = cp.bbox;
    const mY = y + Math.floor(h / 2);
    tempComps[i].bbox[1] = y + (midY - mY);
  });
  return tempComps;
};

const alignCompsByClosingX = comps => {
  let i = 0;
  const limit = comps.length;
  let newComps = [...comps];

  while (i < limit) {
    const [x, y, w, h] = newComps[i].bbox;
    let j = i + 1;
    const midX = x + Math.floor(w / 2);
    let tempSum = midX;
    while (j < limit) {
      const [jx, jy, jw, jh] = newComps[j].bbox;
      const mx = jx + Math.floor(jw / 2);
      if (mx >= x && mx < x + w) {
        tempSum += jx;
        j += 1;
      } else {
        break;
      }
    }
    const newX = Math.floor(tempSum / (j - i + 1));
    console.log(`x range: ${i}, ${j}, ${newX}`);
    for (let a = i; a < j; a++) {
      newComps[a].bbox[0] = newX;
    }
    i = j;
  }
  return newComps;
};

export { resolveOverlapping, postProcessor, alignCompsByY };
