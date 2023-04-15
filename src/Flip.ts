import { Field } from 'snarkyjs';
import { FieldArray } from './util.js';

export function Flip(imgArray: FieldArray, imgWidth: number, imgHeight: number, vertical: boolean): FieldArray {
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
    if (vertical) {
        for (let i = 0; i < img.length; i++) {
            result.push(img[img.length - i - 1]);
        }
    } else {
        for (let i = 0; i < img.length; i++) {
            const row: Field[] = [];
            for (let j = 0; j < img[i].length; j++) {
                row.push(img[i][img[i].length - j - 1]);
            }
            result.push(row);
        }
    }
    // assert result and original image have same pixels
    for (let i = 0; i < img.length; i++) {
        for (let j = 0; j < img[i].length; j++) {
            if (vertical) {
                result[i][j].assertEquals(img[img.length - i - 1][j]);
            } else {
                result[i][j].assertEquals(img[i][img[i].length - j - 1]);
            }
        }
    }

    // flatten result using
    const resultArray: Field[] = [];
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            resultArray.push(result[i][j]);
        }
    }
    
    return FieldArray.from(resultArray);
}