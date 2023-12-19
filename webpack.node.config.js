const { composePlugins, withNx } = require('@nx/webpack');

const CopyPlugin = require('copy-webpack-plugin');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');
const path = require('path');
const packageJson = require('./package.json');

module.exports = composePlugins(withNx(), (config, context) => {
	// Install additional plugins
	config.plugins = config.plugins || [];
	config.plugins.push(...extractRelevantNodeModules());
	return config;
});

/**
 * This repository only contains one single package.json file that lists the dependencies
 * of all its frontend and backend applications. When a frontend application is built,
 * its external dependencies (aka Node modules) are bundled in the resulting artifact.
 * However, it is not the case for a backend application (for various valid reasons).
 * Installing all the production dependencies would dramatically increase the size of the
 * artifact. Instead, we need to extract the dependencies which are actually used by the
 * backend application. We have implemented this behavior by complementing the default
 * Webpack configuration with additional plugins.
 *
 * @param {String} outputPath The path to the bundle being built
 * @returns {Array} An array of Webpack plugins
 */
function extractRelevantNodeModules() {
	return [copyYarnLockFile(), generatePackageJson()];
}

/**
 * Copy the Yarn lock file to the bundle to make sure that the right dependencies are
 * installed when running `yarn install`.
 *
 * @param {String} outputPath The path to the bundle being built
 * @returns {*} A Webpack plugin
 */
function copyYarnLockFile() {
	return new CopyPlugin({
		patterns: [
			{
				from: path.join(process.cwd(), 'yarn.lock'),
				to: 'yarn.lock',
			},
		],
	});
}

/**
 * Generate a package.json file that contains only the dependencies which are actually
 * used in the code.
 *
 * @returns {*} A Webpack plugin
 */
function generatePackageJson() {
	const implicitDeps = ['@nestjs/platform-express', 'reflect-metadata', 'rxjs'];
	const dependencies = implicitDeps.reduce((acc, dep) => {
		acc[dep] = packageJson.dependencies[dep];
		return acc;
	}, {});
	const basePackageJson = {
		dependencies,
	};
	const pathToPackageJson = path.join(__dirname, 'package.json');
	return new GeneratePackageJsonPlugin(basePackageJson, pathToPackageJson);
}
