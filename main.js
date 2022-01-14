import WordProcessor from "./WordProcessor.js";

const wordsCountEl = document.getElementById("words");
const paraCountEl = document.getElementById("wordsParagraphs");
const btnSubmitEl = document.querySelector(".btn");
const btnClearEl = document.querySelector("#clearContent");

const clearInputElements = () => {
    wordsCountEl.value = "";
    paraCountEl.value = "";
};

const processSubmission = () => {
    const wordCount = wordsCountEl.value;
    const paraCount = paraCountEl.value;

    new WordProcessor(wordCount, paraCount);
    clearInputElements();
};

document.addEventListener("DOMContentLoaded", () => {
    wordsCountEl.focus();
});

btnClearEl.addEventListener("click", (e) => {
    e.preventDefault();
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
    wordsCountEl.focus();
});

btnSubmitEl.addEventListener("click", (e) => {
    e.preventDefault();
    processSubmission();
});
