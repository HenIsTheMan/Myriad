import Materials from 'Materials';
import Scene from 'Scene';
import NativeUI from 'NativeUI';

import {
    BlockingAction,
    Wait
} from './BlockingAction'

function* MyRoutine(): IterableIterator<BlockingAction> {
    yield new Wait(3000);
}

import {
    currIndex
} from './MtlControl'

export function LabelChange(mtls: MaterialBase[]): void {
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
    //* Bg
    const canvas: Canvas = await Scene.root.findFirst('Canvas') as Canvas;
    const label: Canvas = await Scene.root.findFirst('Label') as Canvas;

    label.transform.x = canvas.width.mul(0.5).sub(label.bounds.width.mul(0.5));
    label.transform.y = canvas.height.mul(0.5).sub(label.bounds.height.mul(0.5));
    //*/

    //* Text
    const rect: Mesh = await Scene.root.findFirst('Rect') as Mesh;
    const mtls: MaterialBase[] = await Materials.getAll() as MaterialBase[];

    LabelChange(mtls);
    //*/
})();