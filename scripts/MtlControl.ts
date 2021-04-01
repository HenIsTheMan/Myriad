import TouchGestures from 'TouchGestures';
import Materials from 'Materials'
import Scene from 'Scene';
import Reactive from 'Reactive';

import {
    BlockingAction,
    Wait
} from './BlockingAction'

function* MyRoutine(): IterableIterator<BlockingAction> {
    yield new Wait(3000);
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



        rect.getMaterial().then((myMtl: MaterialBase) => {
            myMtl.opacity = Reactive.val(0.4);
        });



        BlockingAction.startCoroutine(MyRoutine);

        LabelChange(mtls);
    });
})();