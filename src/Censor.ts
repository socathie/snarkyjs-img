import { Field } from 'snarkyjs';
import { FieldArray } from './util';

export function Censor(imgArray: FieldArray, imgWidth: number, imgHeight: number, x: number, y: number, width: number, height: number): FieldArray {
    // format imgarray into 2d array
    const img: Field[][] = [];
    for (let i = 0; i < imgHeight; i++) {
        const row: Field[] = [];
        for (let j = 0; j < imgWidth; j++) {
            row.push(imgArray.get(Field(i * imgWidth + j)));
        }
        img.push(row);
    }
    // check image is big enough
    if (img.length < y + height || img[0].length < x + width) {
        throw new Error('Image is too small');
    }

    // Censor
    const result: Field[][] = img;
    for (let i = 0; i < img.length; i++) {
        for (let j = 0; j < img[i].length; j++) {
            if (i >= y && i < y + height && j >= x && j < x + width) {
                result[i][j] = Field(1);
            } else {
                result[i][j] = img[i][j];
            }
        }
    }

    // assert result and original image have same pixels
    for (let i = 0; i < img.length; i++) {
        for (let j = 0; j < img[i].length; j++) {
            if (i >= y && i < y + height && j >= x && j < x + width) {
                result[i][j].assertEquals(Field(1));
            } else {
                result[i][j].assertEquals(img[i][j]);
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