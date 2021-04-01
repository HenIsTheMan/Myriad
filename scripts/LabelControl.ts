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
    const screenMinPt = Reactive.point2d(
        Reactive.val(0),
        Reactive.val(0)
    )
    const screenMaxPt = Reactive.point2d(
        CameraInfo.previewSize.width,
        CameraInfo.previewSize.height
    )

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
        Diagnostics.log(screenMaxPt.x.pinLastValue());
        Diagnostics.log(screenMinPt.x.pinLastValue());
        Diagnostics.log(screenMaxPt.y.pinLastValue());
        Diagnostics.log(screenMinPt.y.pinLastValue());

        TextChange();
    });
})();