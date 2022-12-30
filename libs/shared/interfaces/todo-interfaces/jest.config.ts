/* eslint-disable */
export default {
	name: 'shared-interfaces-todo-interfaces',
	preset: '../../../../jest.config.js',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
	coverageDirectory:
		'../../../../coverage/libs/shared/interfaces/todo-interfaces',
};
