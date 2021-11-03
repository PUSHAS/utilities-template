import { smartChunk } from '../src';

const data = [
	'526d1808c30ec38a',
	'b779be7ab62a963a',
	'5202a90b34e49569',
	'5df44784c7702d7a',
	'20a91f0d8e5e49b5',
	'150381998b03165d',
	'8b2c9974a1445de1',
	'bd305deff8348d31',
	'7e6577eea5969b72',
	'f63777474829640c',
];

test('GIVEN data RETURNS properly chunked data', () => {
	expect(smartChunk(data, 64)).toStrictEqual([
		['526d1808c30ec38a', 'b779be7ab62a963a', '5202a90b34e49569', '5df44784c7702d7a'],
		['20a91f0d8e5e49b5', '150381998b03165d', '8b2c9974a1445de1', 'bd305deff8348d31'],
		['7e6577eea5969b72', 'f63777474829640c'],
	]);
});

test('GIVEN data joined on \\n RETURNS properly chunked data', () => {
	expect(smartChunk(data, 64, '\\n')).toStrictEqual([
		['526d1808c30ec38a', 'b779be7ab62a963a', '5202a90b34e49569'],
		['5df44784c7702d7a', '20a91f0d8e5e49b5', '150381998b03165d'],
		['8b2c9974a1445de1', 'bd305deff8348d31', '7e6577eea5969b72'],
		['f63777474829640c'],
	]);
});
