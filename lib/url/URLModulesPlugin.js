/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const URLGenerator = require("./URLGenerator");
const URLParser = require("./URLParser");

const JavascriptModulesPlugin = require("../JavascriptModulesPlugin");

class URLModulesPlugin {
	constructor() {
		this.plugin = {
			name: "URLModulesPlugin"
		};
	}

	apply(compiler) {
		const { plugin } = this;
		const { compilation } = compiler.hooks;

		compilation.tap(plugin, (compilation, { normalModuleFactory }) => {
			const { createParser, createGenerator } = normalModuleFactory.hooks;

			createParser.for("url").tap(plugin, options => {
				return new URLParser(options);
			});

			createGenerator.for("url").tap(plugin, () => {
				return new URLGenerator();
			});

			const { moduleGraph } = compilation;

			const js = JavascriptModulesPlugin.getHooks(compilation);

			js.shouldRender.tap(plugin.name, module => {
				if (module.type === "url") {
					const issuer = moduleGraph.getIssuer(module);

					return issuer && issuer.type.includes("javascript");
				}
			});
		});
	}
}

module.exports = URLModulesPlugin;
