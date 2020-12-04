class Objective {
    /**
     * Calculates the result of the sigmoid function on a given value
     * @param z Input to the sigmoid function
     */
    static sigmoid(z) {
        return 1.0 / (1.0 + Math.exp(z * -1.0));
    }
    /**
     * Feedforward implementation of the XOR neural network with a sigmoid activation function
     * @param x1 First input for XOR problem
     * @param x2 Second input for XOR problem
     * @param weights Array of current weight values of the neural network
     */
    feedforward(x1, x2, weights) {
        let w1 = weights[0];
        let w2 = weights[1];
        let w3 = weights[2];
        let w4 = weights[3];
        let w5 = weights[4];
        let w6 = weights[5];
        let b1 = weights[6];
        let b2 = weights[7];
        let zh1 = w1 * x1 + w3 * x2 + b1 * 1.0;
        let zh2 = w2 * x1 + w4 * x2 + b1 * 1.0;
        let h1 = Objective.sigmoid(zh1);
        let h2 = Objective.sigmoid(zh2);
        let zy1 = h1 * w5 + h2 * w6 + b2 * 1.0;
        return Objective.sigmoid(zy1);
    }
    /**
     * Get the fitness score of the current neural network
     * @param ws Array of weights that are applied to the neural network
     */
    getFitness(ws) {
        let sum = 0.0;
        for (let i = 0; i < Objective.XOR_INPUTS.length; i++) {
            let x1 = Objective.XOR_INPUTS[i][0];
            let x2 = Objective.XOR_INPUTS[i][1];
            let t1 = Objective.XOR_IDEALS[i];
            let y1 = this.feedforward(x1, x2, ws);
            let diff = y1 - t1;
            let squareErr = diff * diff;
            sum += squareErr;
        }
        return Math.sqrt((1.0 / Objective.XOR_INPUTS.length) * sum);
    }
    calculateScore(genome) {
        let weights = genome.getData();
        return this.getFitness(weights);
    }
    static getRandomWeight() {
        let randomWeight = 0;
        randomWeight = Math.random() * (Objective.RANGE_MAX - Objective.RANGE_MIN) + Objective.RANGE_MIN;
        return randomWeight;
    }
}
Objective.RANGE_MAX = 10.0;
Objective.RANGE_MIN = -10.0;
Objective.XOR_INPUTS = [
    [0.0, 0.0],
    [0.0, 1.0],
    [1.0, 0.0],
    [1.0, 1.0]
];
Objective.XOR_IDEALS = [
    0.0,
    1.0,
    1.0,
    0.0
];
//# sourceMappingURL=objective.js.map