import FormattedJavaCode from './FormattedJavaCode';
import TextLiteralFormatter from './formatters/TextLiteralFormatter';

export default class FormattedCall extends FormattedJavaCode {
  protected format(code: string[]): string {
    let joinedCode = super.format(code);
    joinedCode = FormattedCall.removeWhitespaces(joinedCode);
    const textLiteralFormatter = new TextLiteralFormatter(joinedCode);
    textLiteralFormatter.removeContentOfAll();
    joinedCode = textLiteralFormatter.code;
    return FormattedCall.removeArguments(joinedCode);
  }

  private static removeWhitespaces(text: string): string {
    return text.replace(/\s+/g, '');
  }

  private static removeArguments(text: string): string {
    const toRemove: number[][] = [];
    let started = false;
    let opened = 0;
    let first = 0;
    for (let i = 0; i < text.length; i++) {
      const currentCharacter = text[i];
      if (currentCharacter === '(') {
        if (!started) {
          first = i;
          started = true;
        }
        opened++;
      }
      if (currentCharacter === ')') {
        opened--;
      }
      if (started && opened === 0) {
        toRemove.push([first, i]);
        started = false;
      }
    }

    for (let i = toRemove.length - 1; i >= 0; i--) {
      const [start, end] = toRemove[i];
      text = text.substr(0, start + 1) + text.substr(end);
    }
    return text;
  }
}
