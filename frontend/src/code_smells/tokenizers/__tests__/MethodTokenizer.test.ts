import MethodSignatureTokenizer from '../MethodSignatureTokenizer';
import FormattedJavaCode from '../../FormattedJavaCode';

const endOfLine = '\n';

function testGetName(code: string) {
  const formattedJavaCode = FormattedJavaCode.format(code);
  const methodSignatureTokenizer = new MethodSignatureTokenizer(
    formattedJavaCode
  );

  const actual = methodSignatureTokenizer.getName();
  const expected = 'test';

  expect(actual).toBe(expected);
}

test('get name', () => {
  const code = `
  void test() {
    System.out.println("hi");
  }`;
  testGetName(code);
});

test('get name, one line method', () => {
  const code = 'void test(){System.out.println("hi");}';
  testGetName(code);
});

test('get name, with parameter', () => {
  const code = `
  void test(int a) {
    System.out.println("hi");
  }`;
  testGetName(code);
});

test('get name, with excessive spaces', () => {
  const code = `
   void  test ( )  { 
     System.out.println ( "hi" ) ;
   } `;
  testGetName(code);
});

test('get name, with newlines', () => {
  const code = `
  ${endOfLine}void${endOfLine} ${endOfLine}test${endOfLine}(${endOfLine})${endOfLine} ${endOfLine}{${endOfLine}
    ${endOfLine}System.out.println${endOfLine}(${endOfLine}"hi"${endOfLine})${endOfLine};${endOfLine}
  ${endOfLine}}${endOfLine}`;
  testGetName(code);
});
