
/**
 * @file food_classify_tuning.js
 * @description
 * This script is used for testing and tuning the food classification models defined in `food-classify.js`.
 * It provides utilities to generate test data, calculate prediction errors, and log test results.
 * The script uses labeled datasets to classify words as food or non-food and evaluates the accuracy of the models.
 */

import { prompts, classify, threshold } from "./food-classify.js";
import fs from "fs";
import path from "path";

// Dataset configurations
let datasets = JSON.parse(fs.readFileSync("data/datasets.json", "utf8")); // Load datasets from a JSON file
const getDataFilePath = (version) => `data/classified_food_${version || testVersion}.txt`; // Get the file path for classified food data

let dataset = 0; // Index of the dataset to use
const testVersion = "65"; // Version identifier for the test

// Run tests with the specified prompts, generate flag, and log flag
runTests(prompts, true, false);

/**
 * Runs classification tests using the provided prompts.
 * @param {Array} prompts - The prompts to use for classification.
 * @param {boolean} generate - Whether to generate test data.
 * @param {boolean} log - Whether to log the test results.
 */
async function runTests(prompts, generate, log) {
    if (generate) {
        console.log("Generating test data...");
        await generateTestData(prompts, datasets[dataset]);
    }
    // let testErrors = calculatePredictionErrors(getDataFilePath());
    if (log) {
        console.log("Logging test data...");
        logFoodClassificationTest(prompts, testErrors);
    }
}

/**
 * Generates test data by classifying words in the dataset.
 * @param {Array} prompts - The prompts to use for classification.
 * @param {Array} dataset - The dataset to classify.
 */
async function generateTestData(prompts, dataset) {
    console.log("Generating test data...");
    for (let data of dataset) {
        console.log(`Classifying ${data.word}.`);
        const result = await classify(data.word, prompts);
        data.score = result.score;
        console.log(data.word + ": " + data.score + "\n");
    }
    fs.writeFileSync(getDataFilePath(), JSON.stringify(dataset)); // Save the classified dataset to a file
}

/**
 * Calculates prediction errors from the classified test data.
 * @param {string} path - The file path to the classified test data.
 * @returns {Object} - An object containing false positives, false negatives, and accuracy.
 */
function calculatePredictionErrors(path) {
    const testData = JSON.parse(fs.readFileSync(path)); // Load test data from the file
    let falsePositives = 0;
    let falseNegatives = 0;
    let correct = 0;
    console.log("=== Errors in Final Result ===");
    for (let data of testData) {
        const actualFood = data.label === "food";
        if (!actualFood && data.score > threshold) {
            console.log("False positive: " + data.word);
            falsePositives++;
        } else if (actualFood && data.score <= threshold) {
            console.log("False negative: " + data.word);
            falseNegatives++;
        } else {
            correct++;
        }
    }
    const total = testData.length;
    const accuracy = (total > 0 ? (correct / total) * 100 : 0).toFixed(2) + "%";
    console.log("Accuracy: ", accuracy);
    return {
        falsePositives,
        falseNegatives,
        accuracy: accuracy,
    };
}

/**
 * Logs the results of the food classification test to a file.
 * @param {Array} prompts - The prompts used for classification.
 * @param {Object} errors - The error statistics from the test.
 * @param {string} logFile - The file path to log the test results (default: "data/food_classification_tests.txt").
 */
function logFoodClassificationTest(prompts, errors, logFile = "data/food_classification_tests.txt") {
    const entry = [
        "",
        `Test ${testVersion}`,
        ...prompts.map((prompt, i) =>
            [
                `Model ${i + 1}: ${prompt.model.name}`,
                `  Query Input: ${prompt.queryInput}`,
                `  Parameters: ${JSON.stringify(prompt.parameters)}`,
                `  Threshold: ${prompt.threshold}`,
            ].join("\n")
        ),
        `Dataset: ${dataset},`,
        `Errors: ${JSON.stringify(errors)}`,
        "",
    ];

    fs.appendFileSync(path.resolve(logFile), entry.join("\n")); // Append the test results to the log file
}
