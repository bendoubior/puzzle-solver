import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
    public ZeroToOneToPercentage(value: number): number {
        // Ensure the value is within the [0, 1] range
        const clampedValue = Math.min(Math.max(value, 0), 1);

        // Convert the value to a percentage
        const percentage = (clampedValue * 100).toFixed(0);

        return parseFloat(percentage);
    }
}

