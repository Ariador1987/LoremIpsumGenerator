export default class WordProcessor {
    //#region Privates
    #parentElement = document.getElementById("output");
    #totalWordsCount;
    #totalParaCount;
    // Could've used default properties, prefer this way.
    #errorMessage = "Something went wrong";

    #dummyWords = [
        "Lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet",
        "consectetur",
        "adipisicing",
        "elit",
        "Nobis",
        "officiis",
        "sapiente",
        "laborum",
        "deserunt",
        "quaerat",
        "recusandae",
        "Tempora",
        "necessitatibus",
        "adipisci",
        "pariatur",
        "aliquam",
        "odio",
        "expedita",
        "nesciunt",
        "illum",
        "dignissimos",
        "laudantium",
    ];
    //#endregion

    //#region Constructor
    constructor(words, paragraphs) {
        this.words = words;
        this.paragraphs = paragraphs;
        this.#initialize();
    }
    //#endregion

    //#region Methods
    #validateInputs(...args) {
        const inputArgs = [...args];

        if (inputArgs.length != 2) {
            this.#errorMessage =
                "Invalid number of input parameters. Must be 2.";
            this.#showAlert(this.#errorMessage);
            return;
        }

        for (let element of inputArgs) {
            if (
                Number.parseInt(element) === 0 ||
                Number.parseInt(element) < 0
            ) {
                this.#errorMessage = "Both inputs must be greater than 0.";
                this.#showAlert(this.#errorMessage);
                return;
            }
        }

        if (
            Number.isFinite(Number.parseInt(this.words)) &&
            Number.isFinite(Number.parseInt(this.paragraphs))
        ) {
            this.#totalWordsCount = this.words;
            this.#totalParaCount = this.paragraphs;
        } else {
            this.#errorMessage = "Both inputs must be numbers.";
            this.#showAlert(this.#errorMessage);
            return;
        }
    }

    #clearParentElement() {
        this.#parentElement.innerHTML = "";
    }

    #createContent() {
        this.#clearParentElement();
        for (let i = this.#totalParaCount; i > 0; i--) {
            const para = document.createElement("p");

            const wordsToInsert = this.#dummyWords.slice(
                0,
                this.#totalWordsCount
            );

            const randomizedWords = this.#randomizeWords(wordsToInsert);
            const cleanWords = this.#formatWords(randomizedWords);

            para.textContent = `${cleanWords}.`;
            this.#parentElement.insertAdjacentElement("beforeend", para);
        }
    }

    #randomizeWords(wordsInputArr) {
        let copiedInputArr = [...wordsInputArr];

        for (let i = 0; i < copiedInputArr.length; i++) {
            let currentIndex = this.#generateRandomNumber(copiedInputArr);
            let temp = copiedInputArr[i];
            copiedInputArr[i] = copiedInputArr[currentIndex];
            copiedInputArr[currentIndex] = temp;
        }

        return copiedInputArr;
    }

    #generateRandomNumber(inputArr) {
        if (!Array.isArray(inputArr)) {
            this.#showAlert("Something went wrong.");
            return;
        }

        return (
            Number.parseInt(Math.abs(Math.random() * (inputArr.length - 1))) + 1
        );
    }

    #formatWords(wordsInputArr) {
        if (!Array.isArray(wordsInputArr)) {
            this.#showAlert("Something went wrong.");
            return;
        }
        const wordsToFormat = [...wordsInputArr];

        // always uppercase starting word.
        wordsToFormat[0] = this.#capitalizeWord(wordsToFormat[0]);

        // always lowercase second output word.
        wordsToFormat[1] =
            wordsToFormat[1].charAt(0).toLowerCase() +
            wordsToFormat[1].substring(1, wordsToFormat[1].length);

        // add dot if necessary
        // first word is capitalized therefore
        // we do not take it into consideration by using slice
        wordsToFormat.slice(1, wordsToFormat.length).forEach((word, i) => {
            if (word[0] === word[0].toUpperCase()) {
                // gets the word prior to the uppercased word and adds dot at the end.
                wordsToFormat[i] = wordsToFormat[i] + ".";
            }
        });

        return wordsToFormat.toString().replace(/,/g, " ");
    }

    #capitalizeWord(word) {
        return word.charAt(0).toUpperCase() + word.substring(1, word.length);
    }

    #showAlert(message) {
        this.#clearParentElement();
        const div = document.createElement("div");
        div.textContent = message;
        console.error(message);
        div.classList.add("alert");
        setTimeout(() => {
            div.style.visibility = "hidden";
            div.style.opacity = 0;
        }, 1500);
        document.querySelector("body").insertAdjacentElement("afterbegin", div);
    }

    #initialize() {
        this.#validateInputs(this.words, this.paragraphs);
        this.#clearParentElement();
        this.#createContent();
    }
    //#endregion
}
