const TouchGestures = require('TouchGestures');
const Scene = require('Scene');
const Materials = require('Materials');

const Diagnostics = require('Diagnostics');

(async function() {
    var currIndex = 0;

    const rect = await Scene.root.findFirst('Rect');
    const mtls = await Materials.getAll();

    /*TouchGestures.onTap(rect).subscribe((gesture) => {
        //Diagnostics.log('I am a console message logged from the script');

        //if(currIndex == mtls.length - 1) {
        //    ++currIndex;
        //} else {
        //    currIndex = 0;
        //}
    });*/

    //rect.material = mtls[currIndex];
})();