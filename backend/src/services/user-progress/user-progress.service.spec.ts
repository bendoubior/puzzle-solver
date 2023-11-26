import { Test, TestingModule } from '@nestjs/testing';
import { UserProgressService } from './user-progress.service';
import { UserProgress } from 'src/interfaces/user-progress.interface';
import { Puzzle } from 'src/interfaces/puzzle.interface';
import { Point } from 'src/interfaces/point.interface';
import { PuzzleActionsService } from '../puzzle-actions/puzzle-actions.service';

describe('UserProgressService', () => {
    let service: UserProgressService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PuzzleActionsService, UserProgressService],
        }).compile();

        service = module.get<UserProgressService>(UserProgressService);
    });

    it('should be with currentState as the given state and 0 for other values', () => {
        expect(
            service.GetInitialUserProgress([
                [0, 1],
                [2, 3],
            ]),
        ).toEqual({
            currentState: [
                [0, 1],
                [2, 3],
            ],
            currentStepIndex: 0,
            numberOfCompletedSteps: 0,
        } as UserProgress);
    });

    it('should be moving puzzle to next step', () => {
        expect(
            service.ProgressUserToNextState({
                steps: [{ row: 0, column: 1 }] as Point[],
                userProgress: {
                    currentState: [
                        [0, 1],
                        [2, 3],
                    ],
                    numberOfCompletedSteps: 0,
                    currentStepIndex: 0,
                } as UserProgress,
            } as Puzzle),
        ).toEqual({
            steps: [{ row: 0, column: 1 }] as Point[],
            userProgress: {
                currentState: [
                    [1, 0],
                    [2, 3],
                ],
                numberOfCompletedSteps: 1,
                currentStepIndex: 1,
            } as UserProgress,
        } as Puzzle);
    });

    it('should be moving puzzle to previous step', () => {
        expect(
            service.ProgressUserToPreviousState({
                initialState: [
                    [0, 1],
                    [2, 3],
                ],
                steps: [{ row: 0, column: 1 }] as Point[],
                userProgress: {
                    currentState: [
                        [1, 0],
                        [2, 3],
                    ],
                    numberOfCompletedSteps: 1,
                    currentStepIndex: 1,
                } as UserProgress,
            } as Puzzle),
        ).toEqual({
            initialState: [
                [0, 1],
                [2, 3],
            ],
            steps: [{ row: 0, column: 1 }] as Point[],
            userProgress: {
                currentState: [
                    [0, 1],
                    [2, 3],
                ],
                numberOfCompletedSteps: 1,
                currentStepIndex: 0,
            } as UserProgress,
        } as Puzzle);
    });

    it('should be moving puzzle to initial step', () => {
        expect(
            service.ProgressUserToInitialState({
                initialState: [
                    [0, 1],
                    [2, 3],
                ],
                userProgress: {
                    currentState: [
                        [1, 3],
                        [2, 0],
                    ],
                    currentStepIndex: 2,
                } as UserProgress,
            } as Puzzle),
        ).toEqual({
            initialState: [
                [0, 1],
                [2, 3],
            ],
            userProgress: {
                currentState: [
                    [0, 1],
                    [2, 3],
                ],
                currentStepIndex: 0,
            } as UserProgress,
        } as Puzzle);
    });

    it('should be moving puzzle to initial step', () => {
        expect(
            service.ProgressUserToFinalState({
                finalState: [
                    [0, 1],
                    [2, 3],
                ],
                totalSteps: 10,
                userProgress: {
                    currentState: [
                        [1, 3],
                        [2, 0],
                    ],
                    currentStepIndex: 2,
                } as UserProgress,
            } as Puzzle),
        ).toEqual({
            finalState: [
                [0, 1],
                [2, 3],
            ],
            totalSteps: 10,
            userProgress: {
                currentState: [
                    [0, 1],
                    [2, 3],
                ],
                currentStepIndex: 10,
            } as UserProgress,
        } as Puzzle);
    });
});

