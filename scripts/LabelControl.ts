import NativeUI from 'NativeUI';
import Reactive from 'Reactive';

import {
    Wait,
    WaitForMilliseconds,
    StartCoroutine
} from './Coroutine'

function Lerp(start: number, end: number, lerpFactor: number): number {
    return (1 - lerpFactor) * start + lerpFactor * end;
}

export function ModifyLabel(labelMesh: Mesh, labelTextMesh: Mesh, rect: Mesh, canvas: Canvas, labelCanvas: Canvas): void {
    function* MyRoutine(): IterableIterator<Wait> {
        yield new WaitForMilliseconds(0);

        const animDuration: number = 0.7;
        var animTime: number = 0.0;

        var lerpFactor: number = 0.0;
        var currElapsedTime: number = 0.0;
        var prevElapsedTime: number = new Date().getTime() * 0.001;

        var currAlpha: ScalarSignal;
        const startAlpha: number = 1.0;
        const endAlpha: number = 0.0;

        const canvasHalfWidth: ScalarSignal = canvas.width.mul(0.5);
        const canvasHalfHeight: ScalarSignal = canvas.height.mul(0.5);
        const labelCanvasBoundsWidth: ScalarSignal = labelCanvas.bounds.width;
        const labelCanvasBoundsHeight: ScalarSignal = labelCanvas.bounds.height;
        var currMultiplier: number;
        const startMultiplier: number = 0.2;
        const endMultiplier: number = 0.8;

        var currScale: ScalarSignal;
        var startScale: number = 0.9;
        var endScale: number = 1.1;

        var isFirstTick: boolean = true;

        while(animDuration >= animTime) {
            currElapsedTime = new Date().getTime() * 0.001;

            animTime += currElapsedTime - prevElapsedTime;

            lerpFactor = Math.min(1, animTime / animDuration);

            //* Alpha
            if(!isFirstTick) {
                currAlpha = Reactive.val(Lerp(startAlpha, endAlpha, lerpFactor));

                labelMesh.getMaterial().then((myMtl: MaterialBase): void => {
                    myMtl.opacity = currAlpha;
                });
                labelTextMesh.getMaterial().then((myMtl: MaterialBase): void => {
                    myMtl.opacity = currAlpha;
                });
            } else {
                isFirstTick = false;
            }
            //*/

            //* Pos
            currMultiplier = Lerp(startMultiplier, endMultiplier, lerpFactor);

            labelCanvas.transform.x = canvasHalfWidth.sub(labelCanvasBoundsWidth.mul(0.5));
            labelCanvas.transform.y = canvasHalfHeight.sub(labelCanvasBoundsHeight.mul(currMultiplier));
            //*/

            //* Scale
            currScale = Reactive.val(Lerp(startScale, endScale, lerpFactor));

            labelCanvas.transform.scaleX = currScale;
            labelCanvas.transform.scaleY = currScale;
            //*/

            prevElapsedTime = currElapsedTime;

            yield new WaitForMilliseconds(0);
        }
    }

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

        StartCoroutine(MyRoutine);
    });
}