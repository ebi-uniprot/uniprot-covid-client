# Installation

> This installation guide is based on the steps required for an
> OSX-powered machine with latest updates installed and in clean
> configuration. You may require more or different steps if you are
> using any other operating system.

### Installing JavaScript Dependencies

Now that you have the source code on your local machine, you would need to follow a few steps in order to get it running. Starting with JavaScript dependencies; Our preferred package manager is `yarn`, however, you may use `NPM` or others in your discretion.

> You would need to have a recent version of _Node.JS_, as well as
> a package manager e.g. _Yarn_ or _NPM_, installed before you can continue.

To install JavaScript dependencies, first make sure you are in the root directory of your `uniprot-website` project -- this directory should contain a file named `package.json`, then type `yarn` in the command-line and press return. This should download and install the required JavaScript packages -- this may take a few minutes to finish.

> If the installation was unsuccessful due to any permission/access
> denied related errors -- especially if you are using `NPM`, check your
> package manager's online documentation. [This page](https://docs.npmjs.com/getting-started/fixing-npm-permissions) explains the
> problem and solution for `NPM` users.

### Installing Other Dependencies

Currently, the only other dependency you require to manually install -- it's not handled via JavaScript package managements, is the Ruby's `bundle` package manager. You need to install this, so you can install a `gem` called `scss_lint` which is required for Airbnb's Sass coding-style linter.

Before we begin, you need to make sure Ruby's CLI is installed in your machine. This is a very platform-dependent process, so check the relevant section of Ruby's [online documentation](https://www.ruby-lang.org/en/documentation/installation/) and follow the instructions until you are sure Ruby is properly installed.

After installing _Ruby_, you need to install `bundle` -- Ruby's package manager similar to `NPM`. The [installation process](http://bundler.io/v1.16/guides/using_bundler_in_applications.html) should be as easy as executing the following command in your command-line:

`gem install bundler`

After installing `bundler`, you can go to your project's directory -- where there is a file named `Gemfile`, without extension. Here you can run `bundle install` and it should install all of your _Ruby_ dependencies.

> Please note in the second command we use the word `bundle` -- without `r` in the end, rather `bundler`.

# Usage

Run `yarn run dev-server` and go to [http://localhost:8080](http://localhost:8080) if it didn't open automatically.

# Coding-styles & Linters

Our preferred coding-style conventions are the [Airbnb's](http://airbnb.io/projects/styleguides/) [JavaScript](https://github.com/airbnb/javascript), [React](https://github.com/airbnb/javascript/tree/master/react) and [CSS+Sass](https://github.com/airbnb/css) style guides.

You don't need to read or memorise all the styling rules; Write your code exactly the same way you always do, but when you are finished with editing a file or a even better, after modifying a few lines, go ahead and run the relevant linter in your terminal and the result of linter should be clear and self-explanatory enough for you to easily modify your changes to satisfy the linters.

### Running JavaScript/React/JSX Linter

Simply execute `yarn jslint`.

### Running CSS/Sass Linter

Just execute `yarn csslint`.

# Running Unit Tests

Currently all tests are written on top of Facebook's [Jest Framework](https://facebook.github.io/jest/). Running existing tests would be as easy as executing `yarn test` in the root directory of the project, in the command-line.

# Writing Unit Tests

As mentioned above, tests are written on top of [Jest](https://facebook.github.io/jest/). If you aren't familiar with either Jest or Unit Testing in general, the best place to start would be [Jest's Getting Started](https://facebook.github.io/jest/docs/en/getting-started.html) page.

Once you have got yourself familiar with _Jest_, then start looking at the `__tests__` directory in the root of code-base. You should be able to find a few existing tests there which might be a good template for your first tests here.

Before you start writing your tests, make sure they are in the write place:

- All tests should be placed in the `__tests__` directory, in the root of code-base.
- The `__tests__` directory mimics the exact structure of the `src` directory. The only exceptions are non-JavaScript files and folders e.g. `styles`. You would need to follow this carefully as they are not automatically enforced by linters.

### Working with Jest Snapshots

_Jest_ has a rather unique feature called _Snapshot Testing_. If you are not familiar with that, have a look at [Jest's official documentation](https://facebook.github.io/jest/docs/en/snapshot-testing.html). You must be able to find a few examples of the snapshot testing in the `__tests__` directory as well.

Here there are two points to keep in mind:

1.  _Jest_ will automatically create a directory called `__snapshots__`, where ever it can find a snapshot test! All of your compiled snapshots will be stored in that directory and they need to be committed to the repository as well, as they are part of your tests.
2.  After updating a component which has snapshots tests already, you would need to run the following command to update your snapshots with the latest changes from your component: `yarn update-snapshots`. [Jest's documentation](https://facebook.github.io/jest/docs/en/snapshot-testing.html#updating-snapshots) has a section for updating, as well as resolving failing snapshot tests.
