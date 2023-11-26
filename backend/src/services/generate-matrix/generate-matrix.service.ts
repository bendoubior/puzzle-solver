import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateMatrixService {
    public GenerateRandomMatrix(rows: number, columns: number): number[][] {
        const matrix: number[][] = [];

        // Fill the matrix with numbers from 1 to rows*cols
        const totalNumbers = rows * columns;
        const numbers: number[] = Array.from({ length: totalNumbers }, (_, index) => index);

        // Shuffle the numbers array
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        // Populate the matrix with shuffled numbers
        for (let i = 0; i < rows; i++) {
            matrix.push(numbers.slice(i * columns, (i + 1) * columns));
        }

        return matrix;
    }

    public GenerateFinalMatrix(rows: number, columns: number): number[][] {
        const matrix: number[][] = [];

        // Fill the matrix with numbers from 1 to rows*cols
        const totalNumbers = rows * columns;
        const numbers: number[] = Array.from({ length: totalNumbers }, (_, index) => index + 1);
        numbers[numbers.length - 1] = 0;

        // Populate the matrix with the numbers
        for (let i = 0; i < rows; i++) {
            matrix.push(numbers.slice(i * columns, (i + 1) * columns));
        }

        return matrix;
    }
}

