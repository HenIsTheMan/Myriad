import Scene from 'Scene';
import NativeUI from 'NativeUI';
import Reactive from 'Reactive';

import {
    BlockingAction,
    Wait
} from './BlockingAction'

function Lerp(start: number, end: number, lerpFactor: number): number {
    return (1 - lerpFactor) * start + lerpFactor * end;
}

export function LabelChange(labelMesh: Mesh, labelTextMesh: Mesh, rect: Mesh): void {
    var text: string;

    rect.getMaterial().then((rectMtl: MaterialBase): void => {
        text = rectMtl.name;
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
    });

    function* MyRoutine(): IterableIterator<BlockingAction> {
        const animDuration: number = 0.7;
        var animTime: number = 0.0;

        var currElapsedTime: number = 0.0;
        var prevElapsedTime: number = new Date().getTime() / 1000;

        var currAlpha: number = 0.0;
        const startAlpha: number = 1.0;
        const endAlpha: number = 0.0;

        while(animDuration >= animTime) {
            currElapsedTime = new Date().getTime() / 1000;

            animTime += currElapsedTime - prevElapsedTime;

            currAlpha = Lerp(startAlpha, endAlpha, Math.min(1, animTime / animDuration));

            labelMesh.getMaterial().then((myMtl: MaterialBase): void => {
                myMtl.opacity = Reactive.val(currAlpha);
            });
            labelTextMesh.getMaterial().then((myMtl: MaterialBase): void => {
                myMtl.opacity = Reactive.val(currAlpha);
            });

            prevElapsedTime = currElapsedTime;

            yield new Wait(0);
        }
    }

    BlockingAction.startCoroutine(MyRoutine);
}

(async function(): Promise<void> {
    const canvas: Canvas = await Scene.root.findFirst('Canvas') as Canvas;
    const label: Canvas = await Scene.root.findFirst('Label') as Canvas;

    label.transform.x = canvas.width.mul(0.5).sub(label.bounds.width.mul(0.5));
    label.transform.y = canvas.height.mul(0.5).sub(label.bounds.height.mul(0.5));

    const rect: Mesh = await Scene.root.findFirst('Rect') as Mesh;
    const labelMesh: Mesh = await Scene.root.findFirst('Label') as Mesh;
    const labelTextMesh: Mesh = await Scene.root.findFirst('LabelText') as Mesh;

    LabelChange(labelMesh, labelTextMesh, rect);
})();