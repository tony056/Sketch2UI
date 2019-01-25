import { getNewPosition } from './api/utils';
import { resolveOverlapping, alignCompsByY } from './api/postprocessing';

let instance = null;
class Sketch2UI {
  constructor() {
    this.figma = window.App;
    this.templateFrameId = '566:161';
    this.currentFrameChildren = null;
    this.table = {
      'Button': '14:10',
      'CheckBox': '16:5',
      'Icon': '22:0',
      'Images': '14:2',
      'Input': '14:21',
      'Pager_Indicator': '22:19',
      'Radio_Button': '16:15',
      'Slider': '22:17',
      'Text': '22:22',
      'Bar': '560:0',
      'Card': '560:1',
      'Modal': '660:55'
    }
    this.counter = 0;
    instance = this;
    return instance;
  }

  renderNewFrame(frameId, lowLevelComps, highLevelComps) {
    let count = 0;
    lowLevelComps.forEach(comp => {
      this.createComponent(comp, count);
      count += 1;
    });
  }

  createComponent(comp) {
    const { name, bbox } = comp;
    // console.log(`create component: ${name}`);
    const layer = this.getComponentId(name);
    let [x, y, w, h] = bbox;

    this.focusOnLayer(layer);
    this.figma.sendMessage('duplicateSelection', { newParentId: this.currentFrameId });
    const newId = this.getNewComponentId();
    console.log(`${name} w: ${w}, ${h}, ${newId}`);
    // this.figma.sendMessage('setNodeProperty', {
    //   nodeId: newId,
    //   property: 'name',
    //   value: `${name}_${newId}`
    // });
    // this.focusOnLayer(newId);
    // this.figma.updateSelectionProperties({ x: x, y: y });
    // // console.log(`tw: ${typeof w}, ${typeof h}, ${typeof x}, ${typeof y}`);
    // this.figma.updateSelectionProperties({ width: w, height: h});
    return newId;
  }

  changeFrameName({ id, name, bbox }) {
    const [x, y, w, h] = bbox;
    // this.focusOnLayer(id);
  }

  updateProperties({ id, name, bbox }) {
    const [x, y, w, h] = bbox;
    this.figma.sendMessage('setNodeProperty', {
      nodeId: id,
      property: 'name',
      value: `${name}_${id}`
    });
    this.focusOnLayer(id);
    // console.log(`update: ${w} ${h}`);
    this.figma.updateSelectionProperties({ x, y, width: w, height: h });
  }

  createComponents(comps) {
    console.log(`${comps}`);
    let tmps = [];
    comps.forEach((comp, i) => {
      const id = this.createComponent(comp);
      const tmp = {
        id,
        name: comp.name,
        bbox: comp.bbox
      };
      tmps.push(tmp);
    });
    this.tmps = tmps;
    this.tmps.forEach(cp => {
      if (cp.id) {
        console.log(`change frame name: ${cp.id}`);
        this.updateProperties(cp);
      }
    })
  }

  createToolBar(comp) {
    if (!comp.exist) return;
    const comps = comp.tlComps.concat(comp.trComps);
    let maxY = 60;
    comps.forEach(cp => {
      if (cp.bbox[1] + cp.bbox[3] > maxY)
        maxY = cp.bbox[1] + cp.bbox[3];
    });
    // create resolved comps
    const tlComps = resolveOverlapping(comp.tlComps);
    const newComps = tlComps.concat(comp.trComps);
    const align = alignCompsByY(newComps);
    align.push({
      name: 'Bar',
      bbox: [0, 0, 360, maxY]
    });
    this.createComponents(align);
    // create bar background
    // this.createComponent({
    //   name: 'Bar',
    //   bbox: [0, 0, 360, maxY]
    // });
  }

  createBottomNavigation(comp) {
    if (!comp.exist) return;
    const children = comp.comps;
    let minY = 540;
    let minW = children[0].bbox[2];
    children.forEach(cp => {
      if (cp.bbox[1] < minY)
        minY = cp.bbox[1];
      if (cp.bbox[2] < minW)
        minW = cp.bbox[2];
    });
    // const comps = resolveOverlapping(children);
    // totalW = totalW > 360 ? 360 : totalW;
    const rest = 360 - minW * children.length;
    const space =  Math.floor(rest / (children.length + 1));
    for (let i = 0; i < children.length; i++) {
      children[i].bbox[0] = space * (i + 1) + (i - 1 < 0 ? 0 : minW * i);
    }
    const align = alignCompsByY(children);
    align.push({
      name: 'Bar',
      bbox: [0, minY, 360, 640 - minY]
    });
    this.createComponents(align);
    // this.createComponent({
    //   name: 'Bar',
    //   bbox: [0, minY, 360, 640 - minY]
    // });
  }

  createFrame(frameId, callback) {
    this.figma.sendMessage('clearSelection');
    this.figma.sendMessage('addToSelection', { nodeIds: [this.templateFrameId] });
    const layer = this.figma._state.mirror.sceneGraph.get(this.templateFrameId);
    const { parent } = layer;
    this.figma.sendMessage('duplicateSelection', { newParentId: parent });

    // get new id
    setTimeout(() => {
      const selectedFrameIds = this.figma._selectedFrameIds();
      const newId = selectedFrameIds[0];
      this.currentFrameId = newId;
      this.figma.sendMessage('setNodeProperty', {
        nodeId: newId,
        property: 'name',
        value: `${frameId}_${this.counter}`
      });
      const { x, y } = getNewPosition(195, 469, 360, 640, this.counter);
      this.figma.updateSelectionProperties({ x, y});
      this.figma.sendMessage('clearSelection');
      this.counter += 1;
      callback();
    }, 300);
  }

  getComponentId(componentName){
    return this.table[componentName];
  }

  getNewComponentId() {
    const frame = this.figma._state.mirror.sceneGraph.get(this.currentFrameId);
    const { children } = frame;
    if (!this.currentFrameChildren) {
      this.currentFrameChildren = children;
    }
    if (this.currentFrameChildren.length !== children.length) {
      const origin = new Set(this.currentFrameChildren);
      const newId = children.filter(x => !origin.has(x));
      this.currentFrameChildren = children;
      if (newId) {
        return newId[0];
      } else {
        return '0:0';
      }
    }
  }

  focusOnLayer(id) {
    this.figma.sendMessage('clearSelection');
    this.figma.sendMessage('addToSelection', { nodeIds: [id] });
    // return this.focusOnNewSelectedLayer();
  }

  focusOnNewSelectedLayer() {
    const { sceneGraphSelection } = this.figma._state.mirror;
    // if (isEmpty(sceneGraphSelection)) return null;
    const selectedLayerIds = Object.keys(sceneGraphSelection);
    // if (selectedLayerIds.length > 1) return null;
    console.log(`focus length: ${selectedLayerIds.length}`);
    const id = selectedLayerIds[0];

    this.figma.sendMessage('clearSelection');
    this.figma.sendMessage('addToSelection', { nodeIds: [id] });
    console.log(`new layer id: ${id}`);
    return id;
  }
}

export default Sketch2UI;
