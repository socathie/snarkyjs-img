import {
    Field,
    SmartContract,
    state,
    State,
    method,
} from 'snarkyjs';

import { FieldArray } from './util.js';
import { Censor, Crop, Flip, Resize, Rotate } from './index.js';

const width = 20;
const height = 20;

export class Photoshop extends SmartContract {
    @state(Field) hash = State<Field>();

    @method initState(image: FieldArray) {
        this.hash.set(image.hash());
    }

    @method transform1(image: FieldArray) {
        const hash = this.hash.get();
        this.hash.assertEquals(hash);
        this.hash.assertEquals(image.hash());
        const result = Rotate(image, width, height, 90);

    }

    @method transform2(image: FieldArray) {
        const hash = this.hash.get();
        this.hash.assertEquals(hash);
        this.hash.assertEquals(image.hash());
        const result = Rotate(image, width, height, 180);
    }
}