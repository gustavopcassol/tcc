export default class FormattedJavaCode {
  private readonly _code: string;

  private constructor(code: string) {
    this._code = code;
  }

  get code(): string {
    return this._code;
  }

  static format(code: string): FormattedJavaCode {
    code = code.trim();
    code = this.replaceWhitespacesWithSingleSpace(code);
    return new FormattedJavaCode(code);
  }

  private static replaceWhitespacesWithSingleSpace(text: string): string {
    return text.replace(/\s+/g, ' ');
  }
}