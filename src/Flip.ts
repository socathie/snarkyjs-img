import { Field } from 'snarkyjs';

export function Flip(img: Field[][], vertical: boolean): Field[][] {
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
    
    return result;
}