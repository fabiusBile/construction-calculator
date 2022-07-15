import {action, makeObservable, observable} from "mobx";

/**
 * Регулярное выражение для проверки текста.
 */
const textRegex = /^[А-яA-z,."'!\d-\s+=?]*$/gm;

/**
 * Класс для основного пользовательского ввода текста.
 */
export class MainTextInput {
    /**
     * Введенный текст.
     */
    text: string;

    /**
     * Выбранный размер шрифта.
     */
    fontSize: number;

    /**
     * Длина линии.
     */
    line: number;

    /**
     * Наценка.
     */
    markup: number;

    /**
     * Максимальный размер шрифта.
     */
    readonly maxFontSize: number = 150;

    constructor() {
        this.text = "";
        this.fontSize = 1;
        this.line = 0;
        this.markup = 0;
        makeObservable(this,
            {
                text: observable,
                fontSize: observable,
                line: observable,
                markup: observable,
                setText: action,
                setLine: action,
                setFontSize: action
            });
    }

    /**
     * Устанавливает текст.
     * @param text Размер шрифта.
     */
    setText(text: string) {
        if (text.match(textRegex)) {
            this.text = text;
        }
    }

    /**
     * Устанавливает длину лини.
     * @param line Длина лини.
     */
    setLine(line: number) {
        this.line = line;
    }

    /**
     * Устанавливает размер шрифта.
     * @param fontSize Размер шрифта.
     */
    setFontSize(fontSize: number) {
        if (fontSize <= this.maxFontSize && fontSize > 0) {
            this.fontSize = fontSize;
        }
    }

    /**
     * Устанавливает наценку в процентах.
     * @param markup
     */
    setMarkup(markup: number) {
        if (markup > 0) {
            this.markup = markup;
        }
    }
}