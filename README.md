# [informatiktutor.de](https://informatiktutor.de)

## Setup

Install [`husky`](https://www.npmjs.com/package/husky) hooks and package dependencies.

```
$ yarn install
$ yarn prepare
```

## Development

```
$ yarn watch
```

Open [`localhost:3000`](http://localhost:3000) in your browser.
The page automatically refreshes via
[`browser-sync`](https://www.npmjs.com/package/browser-sync).
The view is synced with other instances, e.g. one on your phone.

## Updating ratings

```
cd ratings
make
# Follow the auth flow in your browser
```

## Deployment of Changes

```
$ git commit -m "..."
```

The `pre-commit` hook will automatically run the following command
and stage any generated files:

```
yarn pages:build
```

(You do not need to run this command manually!)

This builds the production version of this website
and puts the output into the `docs` directory,
which is used by GitHub Pages to serve static content.

```
$ yarn run pages:serve
```

Serve the build output that will be pushed to GitHub Pages
and make sure nothing is terribly broken before making it live.

```
$ git push origin master
```

Now push the changes to update the live page.

---

## Recurring TODOs

**Yearly**, last changed: 2024
* Update copyright year on the page and in the README

## License

This repository does not come with any license for now.

*Copyright &copy; 2021-2024 Jonas van den Berg*
