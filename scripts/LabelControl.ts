import TouchGestures from 'TouchGestures';
import Materials from 'Materials';
import Scene from 'Scene';
import NativeUI from 'NativeUI';
import Reactive from 'Reactive';
import CameraInfo from 'CameraInfo';

import Diagnostics from 'Diagnostics';

import {
    currIndex
} from './MtlControl'

(async function () {
    const canvas: Canvas = await Scene.root.findFirst('Canvas') as Canvas;
    const label: Mesh = await Scene.root.findFirst('Label') as Mesh;

    label.transform.x = canvas.width.mul(0.5);
    label.transform.y = canvas.height.mul(0.5);

    const rect: Mesh = await Scene.root.findFirst('Rect') as Mesh;
    const mtls: MaterialBase[] = await Materials.getAll() as MaterialBase[];

    let TextChange = (): void => {
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

    TextChange();

    TouchGestures.onLongPress(rect).subscribe((event: LongPressGesture) => {
        TextChange();
    });
})();