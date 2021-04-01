import Materials from 'Materials';
import Scene from 'Scene';
import NativeUI from 'NativeUI';
import Reactive from 'Reactive';

import {
    BlockingAction,
    Wait
} from './BlockingAction'

import {
    currIndex
} from './MtlControl'

export function LabelChange(labelMesh: Mesh, labelTextMesh: Mesh, mtls: MaterialBase[]): void {
    function* MyRoutine(): IterableIterator<BlockingAction> {
        yield new Wait(3000);

        labelMesh.getMaterial().then((myMtl: MaterialBase) => {
            myMtl.opacity = Reactive.val(0.4);
        });
        labelTextMesh.getMaterial().then((myMtl: MaterialBase) => {
            myMtl.opacity = Reactive.val(0.4);
        });
    }

    BlockingAction.startCoroutine(MyRoutine);

    var text: string = mtls[currIndex].name;
    text = text.substr(0, text.length - 3);

    var limit: number = text.length;
    for(var i: number = 1; i < limit; ++i) {
        if(text[i] == text[i].toUpperCase()) { //If UpperCase...
            text = text.substring(0, i) + ' ' + text.substring(i, limit);
            ++limit;
            i += 2;
        }
    }

    NativeUI.setText("LabelText", text);
}

(async function () {
    const canvas: Canvas = await Scene.root.findFirst('Canvas') as Canvas;
    const label: Canvas = await Scene.root.findFirst('Label') as Canvas;

    label.transform.x = canvas.width.mul(0.5).sub(label.bounds.width.mul(0.5));
    label.transform.y = canvas.height.mul(0.5).sub(label.bounds.height.mul(0.5));

    const mtls: MaterialBase[] = await Materials.getAll() as MaterialBase[];
    const labelMesh: Mesh = await Scene.root.findFirst('Label') as Mesh;
    const labelTextMesh: Mesh = await Scene.root.findFirst('LabelText') as Mesh;

    LabelChange(labelMesh, labelTextMesh, mtls);
})();