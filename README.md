# utilities-template

> A template repository for creating a package monorepo with Github Packages


## Important Notes

- On every push to `main`, a new `next` publication will be created.
- Creating a non-prerelease is performed below in [How to publish releases](#How-to-publish-releases)
- Ideally, in an organization, you should create a machine account and use it's PATs for automated mumbo
- Most of the logic here comes from [Sapphire](https://github.com/sapphiredev/utilities) but adapted to use Github Packages

# Updating this Repository
1. Update all organization and repository data in the `package.json` files. Namely `root/package.json` and `packages/*/package.json`. Don't forget to update the `name` and `author` fields of `packages/*/package.json` to your scope.
	- Also update the `.npmrc` file to your scope and any `.github/workflows` files
2. Create a Personal Access Token (PAT) with the necessary permissions to read and write packages and set the repository secret `GH_PACKAGES_ADMIN_TOKEN`.
3. Create your own packages following the example `funcs` package.
4. Profit

# Usage

## How to use packages

To use one of your packages, create a `.npmrc` file with the following contents:

```ini
@myorg:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=ghp_
```

> 📝 _Note_: although the file is .**npm**rc, it works with all node-esque package managers

Then, run `yarn add @myorg/packagename`

## How to create a new package

To create a new package, simply follow the structure in `packages/funcs`.
Remember to update the `package.json` and `scripts/clean-full.mjs`.

### How to publish releases

> ⚠ _Warning_: Do **NOT** bump package versions [by editing the package.json file].

To run this command, you need to create a Personal Access Token (PAT) on Github. Ensure it has necessary permissions to create releases and perform commits. When you're ready to create a release, run `GH_TOKEN=xxx yarn lerna version`.

And that's all! The GitHub scripts will handle the rest.
