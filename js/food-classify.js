/**
 * @file food-classify.js
 * @description
 * This script provides utilities for classifying whether a given input string refers to food or drink.
 * It leverages multiple NLP models (DistilBERT, BART, Deepseek variants) via HuggingFace,
 * using a set of prompts and configurable thresholds to aggregate model responses and determine food classification.
 * The script supports extensible model and prompt configurations, and exposes a main `classify` function for use.
 */
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();
const api_key = process.env.HF_API_KEY;
const client = new InferenceClient(api_key);

// Threshold for determining if the input is classified as food
export const threshold = 0.9;

/**
 * Function to calculate the score for Deepseek models.
 * @param {Object} response - The response object from the Deepseek model.
 * @returns {number} - Returns 1 for "yes", 0 for "no", If invalid (no yes/no),
 *  it returns the threshold for minimal impact on the decision.
 */
let getScoreDeepseek = (response) => {
    const result = response.result.toLowerCase().trim();
    if (result.includes("yes")) {
        return 1;
    }
    else if (result.includes("no")) {
        return 0;
    }
    else{
        console.log("bad response: " + response)
        return threshold;
    }
}

// Object containing model configurations for various classification models
const models = {
    distilbert: {
        name: "Distilbert Uncased",
        url: "https://router.huggingface.co/hf-inference/models/typeform/distilbert-base-uncased-mnli",
        /**
         * Generates the payload for the Distilbert model.
         * @param {Object} prompt - The prompt configuration.
         * @param {string} input - The input string to classify.
         * @returns {Object} - The payload for the model.
         */
        getPayload: (prompt, input) => {
            return {
                inputs: prompt.queryInput.replace("[INPUT]", input),
                parameters: prompt.parameters,
            };
        },
        /**
         * Extracts the score from the model's response.
         * @param {Object} response - The response object from the model.
         * @returns {number} - The extracted score.
         */
        getScore: (response) => {
            if (response && response.result && Array.isArray(response.result.scores)) {
                return response.result.scores[0];
            }
            return 0;
        },
        query: queryDistilbert,
    },
    distilbertTuned: {
        name: "Distilbert Food",
        url: "https://router.huggingface.co/hf-inference/models/mrdbourke/learn_hf_food_not_food_text_classifier-distilbert-base-uncased",
        getPayload: (prompt, input) => {
            return { inputs: prompt.queryInput.replace("[INPUT]", input) };
        },
        getScore: (response) => {
            if (response && response.result && Array.isArray(response.result.scores)) {
                return response.result[0].find((obj) => obj.label === "food")?.score ?? 0;
            }
            return 0;
        },
        query: queryDistilbert,

    },
    bart: {
        name: "Bart",
        url: "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli",
        getPayload: (prompt, input) => {
            return {
                inputs: prompt.queryInput.replace("[INPUT]", input),
                parameters: prompt.parameters,
            };
        },
        getScore: (response) => {
            if (response && response.result && Array.isArray(response.result.scores)) {
                const labels = response.result.labels;
                const scores = response.result.scores;
                const ethical = scores[labels.indexOf("ethical")];
                // console.log("ethical: " + ethical)
                if(ethical < 0.35){
                    return ethical;
                }
                return threshold;
            }
            return 0;
        },
        query: queryDistilbert,
    },
    deepseekV2: {
        name: "Deepseek V2",
        provider: "novita",
        model: "deepseek-ai/DeepSeek-Prover-V2-671B",
        query: queryDeepseek,
        getScore: getScoreDeepseek,
    },
    deepseekR1: {
        name: "Deepseek R1",
        provider: "novita",
        model: "deepseek-ai/DeepSeek-R1",
        query: queryDeepseek,
        getScore: getScoreDeepseek,
    },
    deepseekV3: {
        name: "Deepseek V3",
        provider: "together",
        model: "deepseek-ai/DeepSeek-V3",
        query: queryDeepseek,
        getScore: getScoreDeepseek,
    },
    deepseek7B: {
        name: "Deepseek R1 Distill Qwen 7B",
        provider: "nscale",
        model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
        query: queryDeepseek,
        getScore: getScoreDeepseek,
    },
    deepseek1B: {
        name: "Deepseek R1 Distill Qwen 1.5B",
        provider: "nscale",
        model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
        query: queryDeepseek,
        getScore: getScoreDeepseek,
    },
};

// Array of prompts used for classification
export const prompts = [
    {
        model: models.distilbert,
        queryInput: "I enjoyed a [INPUT] for breakfast today.",
        parameters: {
            candidate_labels: ["edible", "non-edible"],
            hypothesis_template: "The subject is {}.",
            multi_label: false,
        },
    },
    {
        model: models.distilbert,
        queryInput: "I'd like a [INPUT] for lunch today.",
        parameters: {
            candidate_labels: ["edible", "non-edible"],
            hypothesis_template: "The subject is {}.",
            multi_label: false,
        },
    },
    {
        model: models.distilbert,
        queryInput: "I'm going to eat some [INPUT] for lunch today.",
        parameters: {
            candidate_labels: ["edible", "non-edible"],
            hypothesis_template: "The subject is {}.",
            multi_label: false,
        },
    },
    {
        model: models.distilbert,
        queryInput: "I had a [INPUT] for dinner today!",
        parameters: {
            candidate_labels: ["edible", "non-edible"],
            hypothesis_template: "The subject is {}.",
            multi_label: false,
        },
    },
    {
        model: models.distilbert,
        queryInput: "I ate some [INPUT] for dinner today",
        parameters: {
            candidate_labels: ["edible", "non-edible"],
            hypothesis_template: "The subject is {}.",
            multi_label: false,
        },
    },
    {
        model: models.bart,
        queryInput: "Is it ethical to eat a [INPUT]",
        parameters: {
            candidate_labels: ["ethical", "unethical"],
            hypothesis_template: "It is {}.",
            multi_label: false,
        },
    },
    {
        model: models.deepseek7B,
        message: `Is the word "[INPUT]" a type of food or drink? 
                Your replies must be only a single word: ["yes", "no"].`,
    },
];

/**
 * Classifies the input using multiple prompts and models.
 * @param {string} input - The input string to classify.
 * @returns {Object} - The classification result containing the input, score, and isFood flag.
 */
export async function classify(input) {
    const promises = prompts.map(prompt => prompt.model.query(input, prompt));
    const responses = await Promise.all(promises);
    let score = 0;
    for (let response of responses) {
        const responseScore = response.prompt.model.getScore(response);
            score+= responseScore;
    }
    score /= prompts.length;
    const isFood = score >= threshold;
    return { input, score, isFood};
}

/**
 * Queries the Distilbert model for classification.
 * Also works for Bart Large mnli
 * @param {string} input - The input string to classify.
 * @param {Object} prompt - The prompt configuration.
 * @returns {Object} - The response from the model.
 */
async function queryDistilbert(input, prompt) {
    const response = await fetch(prompt.model.url, {
        headers: {
            Authorization: `Bearer ${api_key}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(prompt.model.getPayload(prompt, input)),
    });
    const result = await response.json();
    return { result, prompt };
}

/**
 * Queries the Deepseek model for classification.
 * @param {string} input - The input string to classify.
 * @param {Object} prompt - The prompt configuration.
 * @returns {Object} - The response from the model.
 */
async function queryDeepseek(input, prompt) {
    // const start = Date.now();
    const response = await client.chatCompletion({
        provider: prompt.model.provider,
        model: prompt.model.model,
        messages: [
            {
                role: "user",
                content: prompt.message.replace("[INPUT]", input),
            },
        ],
    });
    const content = response.choices[0].message.content;
    // const end = Date.now();
    // console.log(`${prompt.model.name} took ${end - start} ms to classify ${input} as ${content.trim()}`);
    return { result: content, prompt };
}
