import { Field } from 'snarkyjs';

export function Censor(img: Field[][], x: number, y: number, width: number, height: number): Field[][] {
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
    return result;
}