/**
 * Enforces some package versions and presence of certain dependencies in view component modules.
 */

module.exports = {
  hooks: {
    readPackage
  }
}

// const topLevelPkg = require('./package.json')

const NON_UI_PACKAGES = [
  '@vf-ui/core',
  '@vf-ui/persist-svelte-store',
]

function readPackage (pkg, context) {
  // project module validity checks
  if (!NON_UI_PACKAGES.includes(pkg.name)) {
    return pkg
  }

  if (pkg.license !== 'Apache-2.0') {
    throw new Error(`${pkg.name}: Invalid license! \'${pkg.license}\' should be \'Apache-2.0\'.`)
  }

  if (NON_UI_PACKAGES.indexOf(pkg.name) !== -1) {
    // no additional deps to manage for these modules (yet)
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
    "graphql-tag": "^2.11.0",
  }
  pkg.peerDependencies = {
    ...(pkg.peerDependencies || {}),
    "graphql": ">=14",
    "svelte-apollo": ">=0.3",
  }
  context.log(`${pkg.name}: inject GraphQL build deps`)
}
