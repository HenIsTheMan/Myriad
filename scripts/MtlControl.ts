import TouchGestures from 'TouchGestures';
import Materials from 'Materials'
import Scene from 'Scene';

(async function () {
    var currIndex = 0;

    const rect = await Scene.root.findFirst('Rect') as Mesh;
    const mtls = await Materials.getAll() as MaterialBase[];

    TouchGestures.onLongPress(rect).subscribe((event: LongPressGesture) => {
        if(currIndex == mtls.length - 1) {
            currIndex = 0;
        } else {
            ++currIndex;
        }

        rect.material = mtls[currIndex];
    });
})();