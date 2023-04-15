import { isReady, shutdown, Field } from 'snarkyjs';
import { Resize } from './Resize';
import { test } from 'small-mnist';
import { createCanvas, Canvas, CanvasRenderingContext2D } from 'canvas';
import { pack1DArrayTo2D } from './util';
import * as fs from 'fs';

describe('Resize.js', () => {
  describe('Resize()', () => {
    beforeAll(async () => {
      await isReady;
    });

    afterAll(() => {
      setTimeout(() => shutdown(), 0);
    });

    it('should resize a 3x3 image to 2x2', () => {
      const img = [
        [Field(1), Field(2), Field(3)],
        [Field(4), Field(5), Field(6)],
        [Field(7), Field(8), Field(9)],
      ];
      const result = Resize(img, 2, 2);
      const expected = [
        [Field(1), Field(2)],
        [Field(4), Field(5)],
      ];
      expect(result).toEqual(expected);
    });

    it('should resize a 3x3 image to 4x4', () => {
      const img = [
        [Field(1), Field(2), Field(3)],
        [Field(4), Field(5), Field(6)],
        [Field(7), Field(8), Field(9)],
      ];
      const result = Resize(img, 4, 4);
      const expected = [
        [Field(1), Field(1), Field(2), Field(3)],
        [Field(1), Field(1), Field(2), Field(3)],
        [Field(4), Field(4), Field(5), Field(6)],
        [Field(4), Field(4), Field(5), Field(6)],
      ];
      expect(result).toEqual(expected);
    });

    it('should resize an actual image', () => {
      const img = pack1DArrayTo2D(test[0].input, 20, 20);

      // make number[][] into Field[][]
      const imgField = img.map((row) => row.map((pixel) => Field(pixel)));

      const result = Resize(imgField, 30, 40);

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

      fs.writeFileSync('assets/resized.png', buffer);
    });
  });
});
