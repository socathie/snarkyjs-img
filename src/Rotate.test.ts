import { isReady, shutdown, Field } from 'snarkyjs';
import { Rotate } from './Rotate';
import { test } from 'small-mnist';
import { createCanvas, Canvas, CanvasRenderingContext2D } from 'canvas';
import { FieldArray } from './util';
import * as fs from 'fs';

describe('Rotate', () => {
  beforeAll(async () => {
    await isReady;
  });

  afterAll(() => {
    setTimeout(() => shutdown(), 0);
  });

  describe('Rotate()', () => {
    it('should rotate a 3x3 image 90 degrees', () => {
      const img = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(5), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      const result = Rotate(img, 3, 3, 90);
      const expected = [
        [Field(7), Field(4), Field(1)],
        [Field(8), Field(5), Field(2)],
        [Field(9), Field(6), Field(3)],
      ];
      expect(result).toEqual(expected);
    });

    it('should rotate a 3x3 image 180 degrees', () => {
      const img = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(5), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      const result = Rotate(img, 3, 3, 180);
      const expected = [
        [Field(9), Field(8), Field(7)],
        [Field(6), Field(5), Field(4)],
        [Field(3), Field(2), Field(1)],
      ];
      expect(result).toEqual(expected);
    });

    it('should rotate a 3x3 image 270 degrees', () => {
      const img = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(5), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      const result = Rotate(img, 3, 3, 270);
      const expected = [
        [Field(3), Field(6), Field(9)],
        [Field(2), Field(5), Field(8)],
        [Field(1), Field(4), Field(7)],
      ];
      expect(result).toEqual(expected);
    });

    it('should throw error if angle is not 90, 180, or 270', () => {
      const img = FieldArray.from([
        Field(1), Field(2), Field(3),
        Field(4), Field(5), Field(6),
        Field(7), Field(8), Field(9),
      ]);
      expect(() => Rotate(img, 3, 3, 45)).toThrowError();
    });

    it('should rotate an actual image', () => {
      const img = test[0].input;
      const imgField = FieldArray.from(img.map((x) => Field(x)));

      const result = Rotate(imgField, 20, 20, 90);

      // Create a canvas element
      const canvas: Canvas = createCanvas(result[0].length, result.length);

      // Get the 2D rendering context
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

      // Convert the binary array into an image
      for (let y = 0; y < result.length; y++) {
        for (let x = 0; x < result[y].length; x++) {
          const color = result[y][x].toString() === "1" ? 'black' : 'white';
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // Save the image to a file
      const buffer = canvas.toBuffer('image/png');

      fs.writeFileSync('assets/rotated.png', buffer);
    });
  });
});
