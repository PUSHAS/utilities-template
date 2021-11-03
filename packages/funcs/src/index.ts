/**
 * Chunks an array of strings into an array of an array of strings
 * where the total characters of the strings in each chunk is less than
 * or equal to `maxChunkCharacters`.
 * @param data An array of strings
 * @param maxChunkCharacters The maximum amount of characters that should be allowed per chunk
 * @param join The character that each string will later be joined on
 * @returns An array of an array of strings
 * @example
 * ```ts
 * import { randomBytes } from 'crypto';
 * const data = Array.from({ length: 10 }, () => randomBytes(8).toString('hex'));
 * const chunks = smartChunk(data, 64, '\\n');
 * console.log(chunks);
 * // [
 * // 	['d1a15125527746ed', '295789fe6b789f0a', '08960d741984908a'],
 * // 	['5c5672389eed527a', '2ebd329b79d6478b', '1df8dd84f289bebb'],
 * // 	['9db1ce48425c4e59', '6e96797372e2c537', 'bcf7c962b77021ee'],
 * // 	['c09e98072b868b21'],
 * // 	,
 * // ]
 * ```
 */
function smartChunk(data: string[], maxChunkCharacters: number, join = ''): string[][] {
	// what will later be returned, an array of array of strings
	const fragments: string[][] = [];
	// a buffer where each string will be pushed.
	// if adding the next string results in that chunk's characters
	// being greated than `maxChunkCharacters`, the buffer will be
	// pushed into `fragments` and the buffer will be reset
	// with the string we were working on
	let buffer: string[] = [];

	for (const content of data) {
		// calculating the total amount of characters in the buffer
		const currentChunkLength = buffer.reduce((acc, v) => (acc += v.length), 0);
		// add the string to the buffer if adding it doesn't surpass `maxChunkCharacters`
		if (content.length + currentChunkLength + join.length <= maxChunkCharacters) buffer.push(content);
		// if adding that string results in the total amount of characters
		// in the buffer to be greater than `maxChunkCharacters`,
		// push the buffer into fragmets and reset the buffer
		// with the string we're working on
		else {
			fragments.push(buffer);
			buffer = [content];
		}
	}

	// if the buffer has any strings after looping through
	// everything, push it into fragments
	if (buffer.length) fragments.push(buffer);

	return fragments;
}

export { smartChunk };
export default smartChunk;