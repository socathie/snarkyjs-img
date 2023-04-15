import { isReady, shutdown, Field } from 'snarkyjs';
import { Rotate } from './Rotate';
import { test } from 'small-mnist';
import { createCanvas, Canvas, CanvasRenderingContext2D } from 'canvas';
import { pack1DArrayTo2D } from './util';
import * as fs from 'fs';

describe('Rotate', () => {
  beforeAll(async () => {
    await isReady;
  });

  afterAll(() => {
    setTimeout(() => shutdown(), 0);
  });

  describe('Rotate()', () => {
    it.todo('should be correct');

    // it('should flip an actual image', () => {
    //   const img = pack1DArrayTo2D(test[0].input, 20, 20);

    //   // Create a canvas element
    //   const canvas: Canvas = createCanvas(img[0].length, img.length);

    //   // Get the 2D rendering context
    //   const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    //   // Convert the binary array into an image
    //   for (let y = 0; y < img.length; y++) {
    //     for (let x = 0; x < img[y].length; x++) {
    //       const color = img[y][x] === 1 ? 'black' : 'white';
    //       ctx.fillStyle = color;
    //       ctx.fillRect(x, y, 1, 1);
    //     }
    //   }

    //   // Save the image to a file
    //   const buffer = canvas.toBuffer('image/png');

    //   fs.writeFileSync('assets/original.png', buffer);

    //   // make number[][] into Field[][]
    //   const imgField = img.map((row) => row.map((pixel) => Field(pixel)));

    //   const result = Flip(imgField, true);

    //   // Create a canvas element
    //   const canvas2: Canvas = createCanvas(result[0].length, result.length);

    //   // Get the 2D rendering context
    //   const ctx2: CanvasRenderingContext2D = canvas2.getContext('2d');

    //   // Convert the binary array into an image
    //   for (let y = 0; y < result.length; y++) {
    //     for (let x = 0; x < result[y].length; x++) {
    //       const color = result[y][x].toString() === "1" ? 'black' : 'white';
    //       ctx2.fillStyle = color;
    //       ctx2.fillRect(x, y, 1, 1);
    //     }
    //   }

    //   // Save the image to a file
    //   const buffer2 = canvas2.toBuffer('image/png');

    //   fs.writeFileSync('assets/flipped.png', buffer2);
    // });
  });
});
