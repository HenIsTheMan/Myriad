import TouchGestures from 'TouchGestures';
import Materials from 'Materials';
import Scene from 'Scene';
import NativeUI from 'NativeUI';
import Diagnostics from 'Diagnostics';

import {
    currIndex
} from './MtlControl'

(async function () {
    //* Label Bg
    /*var screenWidth: number = 0;
    var screenHeight: number = 0;

    Scene.root.find('Canvas').bounds.height.monitor({ fireOnInitialValue: true }).subscribe(function (height) {
        screen_height = height.newValue;
    });

    Scene.root.find('Canvas').bounds.width.monitor({ fireOnInitialValue: true }).subscribe(function (width) {
        screen_width = width.newValue;
    });*/
    //*/

    //* LabelText
    const rect = await Scene.root.findFirst('Rect') as Mesh;
    const mtls = await Materials.getAll() as MaterialBase[];

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
    //*/
})();