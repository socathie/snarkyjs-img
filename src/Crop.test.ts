import { isReady, shutdown, Field } from 'snarkyjs';
import { Crop } from './Crop';
import { test } from 'small-mnist';
import { createCanvas, Canvas, CanvasRenderingContext2D } from 'canvas';
import { FieldArray, pack1DArrayTo2D } from './util.js';
import * as fs from 'fs';

describe('Crop', () => {
  beforeAll(async () => {
    await isReady;
  });

  afterAll(() => {
    setTimeout(() => shutdown(), 0);
  });

  describe('Crop()', () => {
    it('should return original 3x3 image', () => {
      const img = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(5), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      const expected = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(5), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      const result = Crop(img, 3, 3, 0, 0, 3, 3);
      expect(result).toEqual(expected);
    });

    it('should return 2x2 out of a 3x3 image', () => {
      const img = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(5), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      const result = Crop(img, 3, 3, 0, 0, 2, 2);
      const expected = FieldArray.from([
        Field(1), Field(2),
        Field(4), Field(5),
      ]);
      expect(result).toEqual(expected);
    });

    it('should return 2x2 out of a 3x3 image with offset', () => {
      const img = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(5), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      const result = Crop(img, 3, 3, 1, 1, 2, 2);
      const expected = FieldArray.from([
        Field(5), Field(6),
        Field(8), Field(9),
      ]);
      expect(result).toEqual(expected);
    });

    it('should throw error if image is too small', () => {
      const img = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(5), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      expect(() => Crop(img, 3, 3, 0, 0, 4, 4)).toThrowError('Image is too small');
    });

    it('should crop an actual image', () => {
      const img = pack1DArrayTo2D(test[0].input, 20, 20);

      // Create a canvas element
      const canvas: Canvas = createCanvas(img[0].length, img.length);

      // Get the 2D rendering context
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

      // Convert the binary array into an image
      for (let y = 0; y < img.length; y++) {
        for (let x = 0; x < img[y].length; x++) {
          const color = img[y][x] === 1 ? 'black' : 'white';
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // Save the image to a file
      const buffer = canvas.toBuffer('image/png');

      fs.writeFileSync('assets/original.png', buffer);

      // flatten img and convert to each number into Field, then form FieldArray
      const imgField = FieldArray.from(img.reduce((acc, val) => acc.concat(val), []).map((val) => Field(val)));
      
      const result = Crop(imgField, 20, 20, 0, 0, 20, 10);

      // Create a canvas element
      const canvas2: Canvas = createCanvas(20, 10);

      // Get the 2D rendering context
      const ctx2: CanvasRenderingContext2D = canvas2.getContext('2d');

      // Convert the binary array into an image
      for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 20; x++) {
          const color = result.get(Field(y * 20 + x)).toString() === "1" ? 'black' : 'white';
          ctx2.fillStyle = color;
          ctx2.fillRect(x, y, 1, 1);
        }
      }

      // Save the image to a file
      const buffer2 = canvas2.toBuffer('image/png');
      
      fs.writeFileSync('assets/cropped.png', buffer2);
    });
  });
});
