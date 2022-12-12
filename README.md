# [informatiktutor.de](https://informatiktutor.de)

## Setup

Install [`husky`](https://www.npmjs.com/package/husky) hooks and package dependencies.

```
$ yarn prepare
$ yarn install
```

## Development

```
$ yarn watch
```

Open [`localhost:3000`](http://localhost:3000) in your browser.
The page automatically refreshes via
[`browser-sync`](https://www.npmjs.com/package/browser-sync).
The view is synced with other instances, e.g. one on your phone.

## Deployment of Changes

```
$ git commit -m "..."
```

The `pre-commit` hook will automatically run the following command
and stage any generated files:

```
$ yarn pages:deploy
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
$ git push origin main
```

Now push the changes to update the live page.

---

## License

This repository does not come with any license.

*Copyright &copy; 2021-2022 Jonas van den Berg*
