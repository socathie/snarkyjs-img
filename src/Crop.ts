import { Field } from 'snarkyjs';
import { FieldArray } from './util';

export function Crop(imgArray: FieldArray, imgWidth: number, imgHeight: number, x: number, y: number, width: number, height: number): FieldArray {
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
    const result: Field[][] = [];
    for (let i = 0; i < height; i++) {
        result.push(img[y + i].slice(x, x + width));
    }
    // assert result and original image have same pixels
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            result[i][j].assertEquals(img[y + i][x + j]);
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