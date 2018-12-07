
class Sketch2UI {
  constructor() {
    if (!window.App) {
      console.log('no figmaInstance');
      return;
    }
    this.figma = window.App;
  }

  saveDefaultComponents() {

  }

  renderNewFrame(frameId, lowLevelComps, highLevelComps) {
    let count = 0;
    lowLevelComps.forEach(comp => {
      this.createComponent(comp, count);
      count += 1;
    });
  }

  createComponent(comp, count) {
    const { name, bbox } = comp;
    const layer = this.getComponentLayer(name);
    const [x, y, w, h] = bbox;
    const { parent } = layer;
    this.App.sendMessage('duplicateSelection', { newParentId: parent });
    const newId = this.focusOnNewSelectedLayer();
    this.setNodeProperty(newId, 'name', `${name}_${count}`);
    this.figma.updateSelectionProperties({ x, y, width: w, height: h });
  }

  createFrame() {

  }

  getComponentLayer(componentName){
    const componentId = this.table[componentName];
    return this.figma._state.mirror.sceneGraph.get(componentId);
  }

  focusOnNewSelectedLayer() {
    const { sceneGraphSelection } = this.App._state.mirror;
    // if (isEmpty(sceneGraphSelection)) return null;
    const selectedLayerIds = Object.keys(sceneGraphSelection);
    if (selectedLayerIds.length > 1) return null;
    const id = selectedLayerIds[0];

    this.App.sendMessage('clearSelection');
    this.App.sendMessage('addToSelection', { nodeIds: [id] });

    return id;
  }


}

window.onload = () => {
  const pluginInstance = new Sketch2UI();
  window.pluginInstance = pluginInstance;
}
