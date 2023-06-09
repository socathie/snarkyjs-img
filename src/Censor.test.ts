import { isReady, shutdown, Field } from 'snarkyjs';
import { Censor } from './Censor';
import { test } from 'small-mnist';
import { createCanvas, Canvas, CanvasRenderingContext2D } from 'canvas';
import { FieldArray } from './util.js';
import * as fs from 'fs';

describe('Censor', () => {
  beforeAll(async () => {
    await isReady;
  });

  afterAll(() => {
    setTimeout(() => shutdown(), 0);
  });

  describe('Censor()', () => {
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
      const result = Censor(img, 3, 3, 0, 0, 0, 0);
      expect(result).toEqual(expected);
    });

    it('should censor 2x2 out of a 3x3 image', () => {
      const img = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(5), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      const result = Censor(img, 3, 3, 0, 0, 2, 2);
      const expected = FieldArray.from([
        Field(1), Field(1), Field(3),
        Field(1), Field(1), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      expect(result).toEqual(expected);
    });

    it('should censor 2x2 out of a 3x3 image with offset', () => {
      const img = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(5), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      const result = Censor(img, 3, 3, 1, 1, 2, 2);
      const expected = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(1), Field(1),
        Field(7), Field(1), Field(1),
      ]);
      expect(result).toEqual(expected);
    });

    it('should throw error if image is too small', () => {
      const img = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(5), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      expect(() => Censor(img, 3, 3, 0, 0, 4, 4)).toThrowError('Image is too small');
    });

    it('should Censor an actual image', () => {
      const img = test[0].input;
      const imgField = FieldArray.from(img.map((x) => Field(x)));

      const result = Censor(imgField, 20, 20, 5, 5, 10, 10);

      // Create a canvas element
      const canvas: Canvas = createCanvas(20, 20);

      // Get the 2D rendering context
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

      // Convert the binary array into an image
      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
          const color = result.get(Field(y * 20 + x)).toString() === "1" ? 'black' : 'white';
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // Save the image to a file
      const buffer = canvas.toBuffer('image/png');

      fs.writeFileSync('assets/censored.png', buffer);
    });
  });
});
