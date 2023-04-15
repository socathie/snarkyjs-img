import { isReady, shutdown, Field } from 'snarkyjs';
import { Flip } from './Flip';
import { test } from 'small-mnist';
import { createCanvas, Canvas, CanvasRenderingContext2D } from 'canvas';
import { pack1DArrayTo2D } from './util';
import * as fs from 'fs';

describe('Flip', () => {
  beforeAll(async () => {
    await isReady;
  });

  afterAll(() => {
    setTimeout(() => shutdown(), 0);
  });

  describe('Flip()', () => {
    it('should flip a 3x3 image vertically', () => {
      const img = [
        [Field(1), Field(2), Field(3)],
        [Field(4), Field(5), Field(6)],
        [Field(7), Field(8), Field(9)],
      ];
      const result = Flip(img, true);
      const expected = [
        [Field(7), Field(8), Field(9)],
        [Field(4), Field(5), Field(6)],
        [Field(1), Field(2), Field(3)],
      ];
      expect(result).toEqual(expected);
    });

    it('should flip a 4x4 image horizontally', () => {
      const img = [
        [Field(1), Field(2), Field(3), Field(4)],
        [Field(5), Field(6), Field(7), Field(8)],
        [Field(9), Field(10), Field(11), Field(12)],
        [Field(13), Field(14), Field(15), Field(16)],
      ];
      const result = Flip(img, false);
      const expected = [
        [Field(4), Field(3), Field(2), Field(1)],
        [Field(8), Field(7), Field(6), Field(5)],
        [Field(12), Field(11), Field(10), Field(9)],
        [Field(16), Field(15), Field(14), Field(13)],
      ];
      expect(result).toEqual(expected);
    });



    it('should flip an actual image', () => {
      const img = pack1DArrayTo2D(test[0].input, 20, 20);

      // make number[][] into Field[][]
      const imgField = img.map((row) => row.map((pixel) => Field(pixel)));

      const result = Flip(imgField, true);

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

      fs.writeFileSync('assets/flipped.png', buffer);
    });
  });
});
