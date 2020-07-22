/**
 * Enforces some package versions and presence of certain dependencies in view component modules.
 */

module.exports = {
  hooks: {
    readPackage
  }
}

const topLevelPkg = require('./package.json')

function readPackage (pkg, context) {
  // project module validity checks
  if (!pkg.name.startsWith('@vf-ui/')) {
    return pkg
  }

  if (pkg.license !== 'Apache-2.0') {
    throw new Error(`${pkg.name}: Invalid license! Should be \'Apache-2.0\'.`)
  }

  if (pkg.name === '@vf-ui/graphql-client-holochain') {
    // no additional deps to manage for this module (yet)
  } else {
    injectSvelteBuildDeps(pkg, context)
    // :TODO: only bundle GraphQL deps if needed
    injectGraphQLBuildDeps(pkg, context)
  }

  return pkg
}

function injectSvelteBuildDeps (pkg, context) {
  pkg.peerDependencies = {
    ...(pkg.peerDependencies || {}),
    "svelte": "3.x",
  }
  context.log(`${pkg.name}: inject Svelte build deps`)
}

function injectGraphQLBuildDeps (pkg, context) {
  pkg.dependencies = {
    ...(pkg.dependencies || {}),
    "graphql-tag": "^2.10.4",
  }
  pkg.peerDependencies = {
    ...(pkg.peerDependencies || {}),
    "graphql": ">=14",
    "svelte-apollo": ">=0.3",
  }
  context.log(`${pkg.name}: inject GraphQL build deps`)
}
