import { Field } from 'snarkyjs';
import { FieldArray } from './util';

export function Resize(imgArray: FieldArray, imgWidth: number, imgHeight: number, width: number, height: number): Field[][] {
    // format imgarray into 2d array
    const img: Field[][] = [];
    for (let i = 0; i < imgHeight; i++) {
        const row: Field[] = [];
        for (let j = 0; j < imgWidth; j++) {
            row.push(imgArray.get(Field(i * imgWidth + j)));
        }
        img.push(row);
    }
    
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