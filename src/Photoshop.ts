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
    @state(Field) hash1 = State<Field>();
    @state(Field) hash2 = State<Field>();

    @method initState(image: FieldArray) {
        this.hash.set(image.hash());
    }

    @method transform1(image: FieldArray) {
        const hash = this.hash.get();
        this.hash.assertEquals(hash);
        this.hash.assertEquals(image.hash());
        const step1 = Rotate(image, width, height, 90);
        const step2 = Crop(step1, height, width, 0, 0, 10, 10);
        const result = Censor(step2, 10, 10, 0, 0, 5, 5);
        // console.log(result);
        this.hash1.set(result.hash());
    }

    @method transform2(image: FieldArray) {
        const hash = this.hash.get();
        this.hash.assertEquals(hash);
        this.hash.assertEquals(image.hash());
        const step1 = Flip(image, width, height, true);
        const step2 = Resize(step1, width, height, 10, 10);
        const result = Censor(step2, 10, 10, 0, 0, 5, 5);
        // console.log(result);
        this.hash2.set(result.hash());
    }
}