import TouchGestures from 'TouchGestures';
import Materials from 'Materials'
import Scene from 'Scene';

import {
    LabelChange
} from './LabelControl'

export var currIndex: number = 0;

(async function(): Promise<void> {
    const rect: Mesh = await Scene.root.findFirst('Rect') as Mesh;
    const mtls: MaterialBase[] = await Materials.getAll() as MaterialBase[];
    const labelMesh: Mesh = await Scene.root.findFirst('Label') as Mesh;
    const labelTextMesh: Mesh = await Scene.root.findFirst('LabelText') as Mesh;

    TouchGestures.onLongPress(rect).subscribe((event: LongPressGesture): void => {
        do {
            if(currIndex == mtls.length - 1) {
                currIndex = 0;
            } else {
                ++currIndex;
            }
        } while(mtls[currIndex].name == "BgMtl" || mtls[currIndex].name == "TextMtl");

        rect.material = mtls[currIndex];

        LabelChange(labelMesh, labelTextMesh, rect);
    });
})();