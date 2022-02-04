document.addEventListener('DOMContentLoaded', () => {
    let input = document.querySelector('#originalWord');
    Inputmask().mask(input);

    let resultArea = document.querySelector('.resultArea');

    const endingValues = {
        1: {
            'а': ['ы', 'е', 'у', 'ой', 'е'],
            'я': ['и', 'и', 'ю', 'ей', 'и'],
        },
        2: {
            'm': ['а', 'у', '', 'ом', 'е'],
            'n': ['а', 'у', 'о', 'ом', 'е'],
        },
        3: ['и', 'и', '', 'ю', 'и'],
    };

    let gender = genderValue.value;
    let numerity = numerityValue.value;

    cases.addEventListener('change', () => {
        cases.blur();
    });

    genderValue.addEventListener('change', () => {
        gender = genderValue.value;
        genderValue.blur();
    });

    numerityValue.addEventListener('change', () => {
        gender = numerityValue.value;
        numerityValue.blur();
    });

    updateBtn.addEventListener('click', () => {
        let word = originalWord.value.trim().toLowerCase();
        let wordBase = word.slice(0, -1);
        let originalEnding = word.slice(-1);
        let ending;
        let declination;
        let pCase = cases.value;

        switch (originalEnding) {
            case 'а':
            case 'я':
                declination = 1;
                break;

            case 'ь':
                if (gender = 'm') declination = 2;
                else if (gender = 'f') declination = 3;
                break;

            case 'е':
            case 'о':
                declination = 2;
                break;

            default:
                if (gender = 'm') {
                    declination = 2;
                    wordBase = word;
                }
                else if (gender = 'f') declination = 3;
                break;
        }

        switch (declination) {
            case 1:
                ending = endingValues[1][originalEnding][pCase - 2];
                break;

            case 2:
                ending = endingValues[2][gender][pCase - 2];
                break;

            case 3:
                ending = endingValues[3][pCase - 2];
                break;
        }

        resultArea.textContent = `${wordBase}${ending}`;
    });
})