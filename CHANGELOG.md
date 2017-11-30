# apollo-link-redux CHANGELOG

## 0.1.6

* Refine babel build to use shippedProposals and import/require babel runtime instead of duplicating helpers
* Update README with example usage and browser support

## 0.1.5

* Correctly transpile ESM for `module` entry point

## 0.1.4

* Whitelist using "files" instead of blacklist using .npmignore
* Set "module" to src/index.js
* Round down patch versions of dependencies and peerDependencies
* Update README

## 0.1.3

update README

## 0.1.2

update README

## 0.1.1

.npmignore silly .idea folder

## 0.1.0

Initial release

Supported actions

```
APOLLO_QUERY_INIT
APOLLO_QUERY_RESULT
APOLLO_MUTATION_INIT
APOLLO_MUTATION_RESULT
```
