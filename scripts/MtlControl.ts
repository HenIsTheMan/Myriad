import TouchGestures from 'TouchGestures';
import Materials from 'Materials'
import Scene from 'Scene';
import Reactive from 'Reactive';

import {
    ModifyLabel
} from './LabelControl'

export var currIndex: number = 0;

(async function(): Promise<void> {
    const mtls: MaterialBase[] = await Materials.getAll() as MaterialBase[];
    const canvas: Canvas = await Scene.root.findFirst('Canvas') as Canvas;
    const labelCanvas: Canvas = await Scene.root.findFirst('Label') as Canvas;
    const rect: Mesh = await Scene.root.findFirst('Rect') as Mesh;
    const labelMesh: Mesh = await Scene.root.findFirst('Label') as Mesh;
    const labelTextMesh: Mesh = await Scene.root.findFirst('LabelText') as Mesh;
    const cover: Mesh = await Scene.root.findFirst('Cover') as Mesh;

    let MtlChange = (): void => {
        do {
            if (currIndex == mtls.length - 1) {
                currIndex = 0;
            } else {
                ++currIndex;
            }
        } while (mtls[currIndex].name == "BgMtl" || mtls[currIndex].name == "TextMtl" || mtls[currIndex].name == "RegularMtl");

        rect.material = mtls[currIndex];

        ModifyLabel(labelMesh, labelTextMesh, rect, canvas, labelCanvas);
    };

    const touchSub: Subscription = TouchGestures.onTap(cover).subscribe((event: TapGesture): void => {
        MtlChange();

        cover.getMaterial().then((myMtl: MaterialBase): void => {
            myMtl.opacity = Reactive.val(0.0);
        });

        touchSub.unsubscribe();

        const longPressSub: Subscription = TouchGestures.onLongPress(rect).subscribe((event: LongPressGesture): void => {
            MtlChange();
        });
    });
})();