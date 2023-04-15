export function pack1DArrayTo2D<T>(
    array: T[],
    rows: number,
    columns: number
): T[][] {
    if (rows * columns !== array.length) {
        throw new Error('The provided dimensions do not match the array length.');
    }

    const newArray: T[][] = [];

    for (let row = 0; row < rows; row++) {
        const rowData: T[] = [];
        for (let col = 0; col < columns; col++) {
            rowData.push(array[row * columns + col]);
        }
        newArray.push(rowData);
    }

    return newArray;
}