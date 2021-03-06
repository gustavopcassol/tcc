import CallTokenizer from '../CallTokenizer';
import FormattedCall from '../../formatted_code/FormattedCall';

function getParts(code: string[]): string[] {
  const formattedCall = new FormattedCall(code);
  const callTokenizer = new CallTokenizer(formattedCall);
  return callTokenizer.getParts();
}

test('one method call', () => {
  const code = ['c.doIt()'];
  const actual = getParts(code);
  const expected = ['c', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('one method call with inner call', () => {
  const code = ['c.doIt(z.doIt())'];
  const actual = getParts(code);
  const expected = ['c', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('one method call with linebreak', () => {
  const code = ['c', '. doIt()'];
  const actual = getParts(code);
  const expected = ['c', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('one method call with parameter', () => {
  const code = ['o.setName("my name")'];
  const actual = getParts(code);
  const expected = ['o', 'setName()'];

  expect(actual).toStrictEqual(expected);
});

test('one method call with parameter and linebreak', () => {
  const code = ['o .', 'setName(', '"my name" )'];
  const actual = getParts(code);
  const expected = ['o', 'setName()'];

  expect(actual).toStrictEqual(expected);
});

test('two method calls', () => {
  const code = ['b.doC().doIt()'];
  const actual = getParts(code);
  const expected = ['b', 'doC()', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('two method calls with inner calls', () => {
  const code = ['b.doC(z.doIt()).doIt(z.doIt())'];
  const actual = getParts(code);
  const expected = ['b', 'doC()', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('two method calls with linebreak', () => {
  const code = ['b.', 'doC().', 'doIt()'];
  const actual = getParts(code);
  const expected = ['b', 'doC()', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('two method calls with parameters', () => {
  const code = ['b.doC("hiy").doIt("bye")'];
  const actual = getParts(code);
  const expected = ['b', 'doC()', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('two method calls with parameters and linebreak', () => {
  const code = ['b', '.doC(  "hiy"  )', '.doIt(', '"bye"', ')'];
  const actual = getParts(code);
  const expected = ['b', 'doC()', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('one variable call and one method call', () => {
  const code = ['B.a.doStatic()'];
  const actual = getParts(code);
  const expected = ['B', 'a', 'doStatic()'];

  expect(actual).toStrictEqual(expected);
});

test('one variable call and one method call with parameter', () => {
  const code = ['B.a.doStatic("hi")'];
  const actual = getParts(code);
  const expected = ['B', 'a', 'doStatic()'];

  expect(actual).toStrictEqual(expected);
});

test('one variable call and one method call with parameter and linebreak', () => {
  const code = ['B', '.a', '.doStatic(', "'i'", ')'];
  const actual = getParts(code);
  const expected = ['B', 'a', 'doStatic()'];

  expect(actual).toStrictEqual(expected);
});
