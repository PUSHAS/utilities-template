import { rm } from 'fs/promises';

const rootDir = new URL('../', import.meta.url);
const packagesDir = new URL('packages/', rootDir);
const options = { recursive: true, force: true };

const paths = [
	// Root node_modules
	new URL('node_modules/', rootDir),

	// Nested node_modules folders
	new URL('funcs/node_modules/', packagesDir),

	// Dist folders
	new URL('funcs/build/', packagesDir),
];

await Promise.all(paths.map((path) => rm(path, options)));
