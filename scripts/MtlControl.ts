/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
import TouchGestures from 'TouchGestures';
import Materials from 'Materials'
import Scene from 'Scene';

import Diagnostics from 'Diagnostics';

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

(async function () {  // Enables async/await in JS [part 1]
    var currIndex = 0;

    const rect = await Scene.root.findFirst('Rect') as Mesh;
    const mtls = await Materials.getAll() as MaterialBase[];




    TouchGestures.onTap(rect).subscribe((event: TapGesture) => {
        Diagnostics.log('I am a console message logged from the script');

        if(currIndex == mtls.length - 1) {
            ++currIndex;
        } else {
            currIndex = 0;
        }
    });

    //const plane = await Scene.root.findFirst('plane0') as Plane;

    //TouchGestures.onTap(plane).subscribe(MyCallback);


    rect.material = mtls[currIndex];

    // To access scene objects
    // const [directionalLight] = await Promise.all([
    //   Scene.root.findFirst('directionalLight0') as Promise<DirectionalLightSource>
    // ]);

    // To set signal properties, use Reactive.val.
    // Typescript tries to ensure type safety of property types like this and it does not
    // know that primitives can be assigned to signals.
    // directionalLight.intensity = Reactive.val(0.7);
    // To access class properties
    // const directionalLightIntensity = directionalLight.intensity;

    // To log messages to the console
    // Diagnostics.log('Console message logged from the script.');

})(); // Enables async/await in JS [part 2]
