import { Field } from 'snarkyjs';
import { FieldArray } from './util';

export function Rotate(imgArray: FieldArray, imgWidth: number, imgHeight: number, degree: number): Field[][] {
    // format imgarray into 2d array
    const img: Field[][] = [];
    for (let i = 0; i < imgHeight; i++) {
        const row: Field[] = [];
        for (let j = 0; j < imgWidth; j++) {
            row.push(imgArray.get(Field(i * imgWidth + j)));
        }
        img.push(row);
    }
    
    // check degree is 90, 180 or 270
    if (degree !== 90 && degree !== 180 && degree !== 270) {
        throw new Error('Degree must be 90, 180 or 270');
    }
    
    const result: Field[][] = [];
    if (degree === 90) {
        for (let i = 0; i < img[0].length; i++) {
            const row: Field[] = [];
            for (let j = 0; j < img.length; j++) {
                row.push(img[img.length - j - 1][i]);
            }
            result.push(row);
        }
    }

    if (degree === 180) {
        for (let i = 0; i < img.length; i++) {
            const row: Field[] = [];
            for (let j = 0; j < img[i].length; j++) {
                row.push(img[img.length - i - 1][img[i].length - j - 1]);
            }
            result.push(row);
        }
    }

    if (degree === 270) {
        for (let i = 0; i < img[0].length; i++) {
            const row: Field[] = [];
            for (let j = 0; j < img.length; j++) {
                row.push(img[j][img[i].length - i - 1]);
            }
            result.push(row);
        }
    }

    // assert result and original image have same pixels
    for (let i = 0; i < img.length; i++) {
        for (let j = 0; j < img[i].length; j++) {
            if (degree === 90) {
                result[i][j].assertEquals(img[img.length - j - 1][i]);
            }
            if (degree === 180) {
                result[i][j].assertEquals(img[img.length - i - 1][img[i].length - j - 1]);
            }
            if (degree === 270) {
                result[i][j].assertEquals(img[j][img[i].length - i - 1]);
            }
        }
    }

    return result;
}