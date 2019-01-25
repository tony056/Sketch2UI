import Sketch2UI from './plugin';
import { resolveOverlapping, postProcessor } from './api/postprocessing';

class DataParser {
  constructor(plugin) {
    this.plugin = plugin;
  }

  parseData(data) {
    console.log('parsing data....');
    const { frameId, lowLevelComps, highLevelComps } = data;
    this.plugin.createFrame(frameId, () => {
      console.log('parsing data.... lowLevelComps');
      const { toolBar, bottomNavigation, restComps } = postProcessor(lowLevelComps);
      // // render lowLevelComps
      // toolBar.tlComps.forEach(p => {
      //   console.log(`tool bar: ${p.bbox[0]} ${p.bbox[1]}`);
      // });
      // toolBar.trComps.forEach(p => {
      //   console.log(`tool bar: ${p.bbox[0]} ${p.bbox[1]}`);
      // });
      // bottomNavigation.comps.forEach(p => {
      //   console.log(`bn: ${p.bbox[0]} ${p.bbox[1]}`);
      // });
      // this.plugin.createToolBar(toolBar);
      // this.plugin.createBottomNavigation(bottomNavigation);
      // // const resolvedLowComps = resolveOverlapping(lowLevelComps);
      this.plugin.createComponents(restComps);
      // console.log('parsing data.... highLevelComps');
      // // // render highLevelComps
      // const resolvedHighComps = resolveOverlapping(highLevelComps);
      // this.plugin.createComponents(resolvedHighComps);
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
