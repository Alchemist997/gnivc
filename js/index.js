document.addEventListener('DOMContentLoaded', () => {
    let input = document.querySelector('#originalWord');
    Inputmask().mask(input);

    let resultArea = document.querySelector('.resultArea');
    let questionsArea = document.querySelector('.questionsForCase');

    const questionsForCases = ['кого? чего?', 'кому? чему?', 'кого? что?', 'кем? чем?', 'о ком? о чем?'];

    const exceptionWords = ['евро', 'кафе', 'кофе', 'метро', 'пальто', 'пианино', 'рагу',
        'такси', 'фортепиано', 'какаду', 'шимпанзе', 'какао', 'авокадо', 'кино', 'эскимо'];

    const endingValues = {
        // свойство(цифра) равна склонению слова
        1: {
            'а': ['ы', 'е', 'у', 'ой', 'е'],
            'я': ['и', 'е', 'ю', 'ей', 'е'],
            'ия': ['и', 'и', 'ю', 'ей', 'и'],
            'шаща': ['и', 'е', 'у', 'ей', 'е'],
            'каха': ['и', 'е', 'у', 'ой', 'е'],
        },
        2: {
            'm': ['а', 'у', '', 'ом', 'е'],
            'm-soft': ['я', 'ю', 'я', 'ем', 'е'],
            'n': ['а', 'у', 'о', 'ом', 'е'],
            'n-e': ['я', 'ю', 'е', 'ем', 'е'],
            'ei': ['я', 'ю', 'й', 'ем', 'е'],
            'ii': ['я', 'ю', 'й', 'ем', 'и'],
        },
        3: ['и', 'и', 'ь', 'ью', 'и'],
    };

    let gender = genderSwitch.value;

    cases.addEventListener('change', () => {
        questionsArea.textContent = `${questionsForCases[caseValue()]}`;
        cases.blur();
        updateBtn.click();
    });

    genderSwitch.addEventListener('change', () => {
        genderSwitch.blur();
        updateBtn.click();
    });

    document.addEventListener('keydown', evt => {
        if (evt.key.toLowerCase() === 'enter') updateBtn.click();
    });

    // numerityValue.addEventListener('change', () => {
    //     gender = numerityValue.value;
    //     numerityValue.blur();
    // });

    updateBtn.addEventListener('click', () => {
        let word = originalWord.value.trim().toLowerCase();

        if (word.length < 2) return updateResult('');

        if (exceptionWords.indexOf(word) > -1) return updateResult(word);

        let wordBase = word.slice(0, -1);
        let originalEnding = word.slice(-1);
        let sliceFull = word.slice(-2);
        let ending;
        let declination;
        gender = genderSwitch.value;

        switch (originalEnding) {
            case 'а':
            case 'я':
                declination = 1;
                if (sliceFull === 'ия') originalEnding = 'ия';
                if (sliceFull === 'ша' || sliceFull === 'ща') originalEnding = 'шаща';
                if (sliceFull === 'ка' || sliceFull === 'ха') originalEnding = 'каха';
                break;

            case 'ь':
                if (gender === 'm' || gender === 'm-soft') {
                    gender = 'm-soft';
                    declination = 2;
                }
                else if (gender === 'f') {
                    declination = 3;
                }
                else {
                    return alert('Выберите мужской или женский род');
                }
                break;

            case 'е':
            case 'о':
                declination = 2;
                originalEnding === 'о' ? gender = 'n' : gender = 'n-e';
                // также нужно добавить смену значения в селекте визуально
                break;

            case 'й':
                declination = 2;
                sliceFull === 'ий' ? gender = 'ii' : gender = 'ei';
                break;

            default:
                if (gender === 'm') {
                    declination = 2;
                    wordBase = word;
                }
                else {
                    return alert('Выберите мужской род');
                }
                break;
        }

        switch (declination) {
            case 1:
                ending = endingValues[1][originalEnding][caseValue()];
                break;

            case 2:
                ending = endingValues[2][gender][caseValue()];
                break;

            case 3:
                ending = endingValues[3][caseValue()];
                break;
        }

        updateResult(`${wordBase}${ending}`);
    });

    // ============================================================================== Функции

    function updateResult(resultWord) {
        resultArea.classList.add('active');
        setTimeout(() => { resultArea.classList.remove('active'); }, 500);
        resultArea.textContent = resultWord;
    }

    function caseValue() {
        return cases.value - 2;
    }
});
