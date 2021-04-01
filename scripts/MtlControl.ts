import TouchGestures from 'TouchGestures';
import Materials from 'Materials'
import Scene from 'Scene';

import Diagnostics from 'Diagnostics';
import { BlockingAction, Wait } from './BlockingAction';

function* MyRoutine(): IterableIterator<BlockingAction> {
    let time = new Date().getTime();
    Diagnostics.log('Time to wait for 3 sec');
    yield new Wait(3000);
    Diagnostics.log('This was a blocking call!');
    Diagnostics.log('The time taken was: ' + (new Date().getTime() - time));
}

import {
    LabelChange
} from './LabelControl'

export var currIndex: number = 0;

(async function () {
    const rect = await Scene.root.findFirst('Rect') as Mesh;
    const mtls = await Materials.getAll() as MaterialBase[];

    TouchGestures.onLongPress(rect).subscribe((event: LongPressGesture) => {
        do {
            if (currIndex == mtls.length - 1) {
                currIndex = 0;
            } else {
                ++currIndex;
            }
        } while(mtls[currIndex].name == "NoobMtl");

        rect.material = mtls[currIndex];

        BlockingAction.startCoroutine(MyRoutine);

        LabelChange(mtls);
    });
})();