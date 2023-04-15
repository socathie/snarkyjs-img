import {
    Field,
    SmartContract,
    state,
    State,
    method,
    Poseidon,
} from 'snarkyjs';

export class Photoshop extends SmartContract {
    @state(Field) hash = State<Field>();

    @method initState(image: Field[][]) {
        // flatten the image
        const flattened = image.reduce((acc, row) => acc.concat(row), []);
        this.hash.set(Poseidon.hash(flattened));
    }
}