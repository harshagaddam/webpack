/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const { RawSource } = require("webpack-sources");

class URLGenerator {
	generate(module, { moduleGraph }) {
		let source = module.originalSource().source();

		const issuer = moduleGraph.getIssuer(module);

		if (issuer && issuer.type.includes("javascript")) {
			source = `module.exports = __webpack_require__.p + '${source}'`;
		}

		return new RawSource(source);
	}
}

module.exports = URLGenerator;
