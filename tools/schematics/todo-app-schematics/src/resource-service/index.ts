import { strings } from '@angular-devkit/core';
import {
	apply,
	chain,
	mergeWith,
	move,
	Rule,
	SchematicContext,
	template,
	Tree,
	url,
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import {
	buildDefaultPath,
	getProject,
} from '@schematics/angular/utility/project';

import { Schema } from './schema';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function resourceService(_options: Schema): Rule {
	return async (tree: Tree, _context: SchematicContext) => {
		const workspace = await getWorkspace(tree);
		const projectName = _options.project || Object.keys(workspace.projects)[0];
		const project = getProject(workspace as any, projectName);
		const path = _options.path || buildDefaultPath(project);
		const parsedPath = parseName(path, _options.name);

		_options.name = parsedPath.name;
		_options.path = parsedPath.path;

		const templateSource = apply(url('./files'), [
			template({ ..._options, ...strings }),
			move(parsedPath.path),
		]);
		return chain([mergeWith(templateSource)]);
	};
}
