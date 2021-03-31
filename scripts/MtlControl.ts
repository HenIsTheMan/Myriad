import TouchGestures from 'TouchGestures';
import Materials from 'Materials'
import Scene from 'Scene';

(async function () {  // Enables async/await in JS [part 1]
    var currIndex = 0;

    const rect = await Scene.root.findFirst('Rect') as Mesh;
    const mtls = await Materials.getAll() as MaterialBase[];

    TouchGestures.onTap(rect).subscribe((event: TapGesture) => {
        if(currIndex == mtls.length - 1) {
            currIndex = 0;
        } else {
            ++currIndex;
        }

        rect.material = mtls[currIndex];
    });
})();
