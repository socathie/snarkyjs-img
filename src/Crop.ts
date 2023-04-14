import { Field } from 'snarkyjs';

export function Crop(img: Field[][], x: number, y: number, width: number, height: number): Field[][] {
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
    return result;
}