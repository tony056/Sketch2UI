import Sketch2UI from './plugin';

class DataParser {
  constructor(plugin) {
    this.plugin = plugin;
  }

  parseData(data) {
    console.log('parsing data....');
    const { frameId, lowLevelComps, highLevelComps } = data;
    this.plugin.createFrame(frameId, () => {
      console.log('parsing data.... lowLevelComps');
      // render lowLevelComps
      lowLevelComps.forEach(comp => {
        this.plugin.createComponent(comp);
      });
      console.log('parsing data.... highLevelComps');
      // render highLevelComps
      highLevelComps.forEach(comp => {
        this.plugin.createComponent(comp);
      });
    });
  }
}


window.onload = () => {
  console.log(`App exists: ${window.App}`);
  window.sk2uiInstance = new Sketch2UI();
  window.parser = new DataParser(window.sk2uiInstance);
};

window.addEventListener('skNewData', (e) => {
  window.parser.parseData(e.detail.data);
});
