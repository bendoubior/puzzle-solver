export default () => ({
    generatePuzzleMaxAttempts: parseInt(process.env.GENERATE_PUZZLE_MAX_ATTEMPTS, 10) || 3,
});
