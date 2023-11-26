export default () => ({
    generatePuzzleMaxAttempts: parseInt(process.env.GENERATE_PUZZLE_MAX_ATTEMPTS, 10) || 3,
    generatePuzzleDepthLimit: parseInt(process.env.GENERATE_PUZZLE_DEPTH_LIMIT, 10) || 30,
});
