import Materials from 'Materials';
import Scene from 'Scene';
import NativeUI from 'NativeUI';
import Reactive from 'Reactive';
import Time from 'Time';

import {
    BlockingAction,
    Wait
} from './BlockingAction'

import {
    currIndex
} from './MtlControl'

function Lerp(start: number, end: number, lerpFactor: number): number {
    return (1 - lerpFactor) * start + lerpFactor * end;
}

export function LabelChange(labelMesh: Mesh, labelTextMesh: Mesh, mtls: MaterialBase[]): void {
    function* MyRoutine(): IterableIterator<BlockingAction> {
        const animDuration: number = 0.7;
        var animTime: number = 0.0;

        var currElapsedTime: number = 0.0;
        var prevElapsedTime: number = 0.0;

        var currAlpha: number = 0.0;
        const startAlpha: number = 1.0;
        const endAlpha: number = 0.0;

        for(;;) {
            currElapsedTime = Time.ms.pinLastValue();

            if(animDuration >= animTime) {
                animTime += currElapsedTime - prevElapsedTime;

                currAlpha = Lerp(startAlpha, endAlpha, Math.min(1, animTime / animDuration));

                labelMesh.getMaterial().then((myMtl: MaterialBase) => {
                    myMtl.opacity = Reactive.val(currAlpha);
                });
                labelTextMesh.getMaterial().then((myMtl: MaterialBase) => {
                    myMtl.opacity = Reactive.val(currAlpha);
                });

                prevElapsedTime = currElapsedTime;

                //yield null;

                yield new Wait(0);
            } else {
                break;
            }
        }
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