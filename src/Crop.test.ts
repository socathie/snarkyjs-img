import { isReady, shutdown, Field } from 'snarkyjs';
import { Crop } from './Crop';

describe('Crop.js', () => {
  beforeAll(async () => {
    await isReady;
  });

  afterAll(() => {
    setTimeout(() => shutdown(), 0);
  });

  describe('Crop()', () => {
    it('should return original 3x3 image', () => {
      const img = [
        [Field(1), Field(2), Field(3)],
        [Field(4), Field(5), Field(6)],
        [Field(7), Field(8), Field(9)],
      ];
      const result = Crop(img, 0, 0, 3, 3);
      expect(result).toEqual(img);
    });

    it('should return 2x2 out of a 3x3 image', () => {
      const img = [
        [Field(1), Field(2), Field(3)],
        [Field(4), Field(5), Field(6)],
        [Field(7), Field(8), Field(9)],
      ];
      const result = Crop(img, 0, 0, 2, 2);
      const expected = [
        [Field(1), Field(2)],
        [Field(4), Field(5)],
      ];
      expect(result).toEqual(expected);
    });

    it('should return 2x2 out of a 3x3 image with offset', () => {
      const img = [
        [Field(1), Field(2), Field(3)],
        [Field(4), Field(5), Field(6)],
        [Field(7), Field(8), Field(9)],
      ];
      const result = Crop(img, 1, 1, 2, 2);
      const expected = [
        [Field(5), Field(6)],
        [Field(8), Field(9)],
      ];
      expect(result).toEqual(expected);
    });

    it('should throw error if image is too small', () => {
      const img = [
        [Field(1), Field(2), Field(3)],
        [Field(4), Field(5), Field(6)],
        [Field(7), Field(8), Field(9)],
      ];
      expect(() => Crop(img, 0, 0, 4, 4)).toThrowError('Image is too small');
    });
  });
});
