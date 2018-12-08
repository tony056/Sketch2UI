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
      'Modal': '0:0'
    }
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
    console.log(`create component: ${name}`);
    const layer = this.getComponentId(name);
    let [x, y, w, h] = bbox;
    x = Math.round(x / 4);
    y = Math.round(y / 4);
    w = Math.round(w / 4);
    h = Math.round(h / 4);

    this.focusOnLayer(layer);
    this.figma.sendMessage('duplicateSelection', { newParentId: this.currentFrameId });
    const newId = this.getNewComponentId();
    // this.figma.sendMessage('clearSelection');
    // this.figma.sendMessage('addToSelection', { nodeIds: [newId] });
    console.log(`new props: ${x}, ${y}, ${w}, ${h}`);
    this.figma.sendMessage('setNodeProperty', {
      nodeId: newId,
      property: 'name',
      value: `${name}_${newId}`
    });
    this.figma.updateSelectionProperties({ x, y});
    this.figma.updateSelectionProperties({ width: w, height: h});
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
        value: `${frameId}`
      });
      this.figma.updateSelectionProperties({ x: 580, y: 469});
      this.figma.sendMessage('clearSelection');
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
      return newId;
    }
  }

  focusOnLayer(id) {
    this.figma.sendMessage('clearSelection');
    this.figma.sendMessage('addToSelection', { nodeIds: [id] });
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
