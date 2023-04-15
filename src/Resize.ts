import { Field } from 'snarkyjs';

export function Resize(img: Field[][], width: number, height: number): Field[][] {
    const result: Field[][] = [];
    const w = img[0].length;
    const h = img.length;
    for (let i = 0; i < height; i++) {
        const row: Field[] = [];
        for (let j = 0; j < width; j++) {
            row.push(img[Math.floor(i * h / height)][Math.floor(j * w / width)]);
        }
        result.push(row);
    }
    return result;
}