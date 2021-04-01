import TouchGestures from 'TouchGestures';
import Materials from 'Materials';
import Scene from 'Scene';
import NativeUI from 'NativeUI';

import {
    currIndex
} from './MtlControl'

(async function () {
    const rect = await Scene.root.findFirst('Rect') as Mesh;
    const mtls = await Materials.getAll() as MaterialBase[];

    let TextChange = (): void => {
        var text: string = mtls[currIndex].name;

        text = text.substr(0, text.length - 3);

        NativeUI.setText("Label", text);
    }

    TextChange();

    TouchGestures.onLongPress(rect).subscribe((event: LongPressGesture) => {
        TextChange();
    });
})();