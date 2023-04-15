import {
    Field,
    SmartContract,
    state,
    State,
    method,
} from 'snarkyjs';

import { FieldArray } from './util';

export class Photoshop extends SmartContract {
    @state(Field) hash = State<Field>();

    @method initState(image: FieldArray) {
        this.hash.set(image.hash());
    }
}