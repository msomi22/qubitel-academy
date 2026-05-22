import assert from 'node:assert/strict';
import test from 'node:test';
import { tokenizeCode } from './codeTokenizer.js';

function flattenTypes(code) {
  return tokenizeCode(code).flat().map((token) => token.type);
}

test('tokenizeCode preserves line structure and indentation as plain tokens', () => {
  const lines = tokenizeCode('public class Demo {\n  return 42;\n}');

  assert.equal(lines.length, 3);
  assert.equal(lines[1][0].value, '  ');
});

test('tokenizeCode marks Java-like keywords, strings, comments, and numbers', () => {
  const types = flattenTypes('public String name = "Ada"; int count = 42; // user');

  assert.ok(types.includes('keyword'));
  assert.ok(types.includes('string'));
  assert.ok(types.includes('comment'));
  assert.ok(types.includes('number'));
});

test('tokenizeCode marks types and methods where practical', () => {
  const tokens = tokenizeCode('UserService service = new UserService();\nservice.save(user);').flat();

  assert.ok(tokens.some((token) => token.type === 'type' && token.value === 'UserService'));
  assert.ok(tokens.some((token) => token.type === 'method' && token.value === 'save'));
});

test('tokenizeCode supports multiline block comments', () => {
  const lines = tokenizeCode('/* start\nstill comment */\nreturn true;');

  assert.equal(lines[0][0].type, 'comment');
  assert.equal(lines[1][0].type, 'comment');
  assert.ok(lines[2].some((token) => token.type === 'keyword' && token.value === 'return'));
});
