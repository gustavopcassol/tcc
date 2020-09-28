import FormattedJavaCode from '../FormattedJavaCode';

export default abstract class JavaCodeTokenizer {
  private readonly _code: string;

  constructor(formattedJavaCode: FormattedJavaCode) {
    this._code = formattedJavaCode.code;
  }

  protected get code(): string {
    return this._code;
  }
}