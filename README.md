# Surveys frontend implemetatoion

## React + TypeScript + Vite Project for a SpringMVC Backend application


### Set-UP

Run the following commands to build and setup the running backend application which is required for this frontend app.

The link of that repo is [here](https://github.com/schnorbeee/survey)
or the Reactive Java version [here](https://github.com/schnorbeee/survey-reactive)

Clone / checkout the backend app, directly next to our frontend application.

```
git clone https://github.com/schnorbeee/survey
```

Then step into this directory and run the docker build commands

```
cd survey
docker-compose up -d --build
```

APPLAUSE, WE ARE DONE!!!

If everythings works fine, we can test is out within the url: http://localhost:3000/ 


### Stack informations:

- Latest React (19.x)
- Vite for faster build
- Redux toolkit (for RTK Queries)
- sass (for processing .scss)
- React-hook-form

The project has been created under node version:22.

For more documentations about theese stack-techs:
- [React](https://react.dev/learn)
- [Vite](https://vite.dev/guide/)
- [Redux toolkit](https://redux.js.org/)