# My Flix Client

My Flix Client is the client-side web application that allows users to access movie information such as the title, description, director, and genre. Users are also able to create an account, update their account, add and remove favorite movies from their account list, and delete their account.

The current website can be found and tested at [http://localhost:1234](http://localhost:1234) and [https://myflix-kr.netlify.app/login](https://myflix-kr.netlify.app/login).

## Description

The goal of this Single-Page Application (SPA) is to:

- Use state routing to navigate between views and share URLs
- Give users the option to filter movies using a “search” feature
- Use Parcel as its build tool
- Be written using the React library and in ES2015+
- Use Bootstrap as a UI library for styling and responsiveness
- Contain function components
- Be hosted online
- Use React Redux for state management of at least one feature (i.e., f iltering movies)

## Usage

To start the application locally, run the following command:

```
parcel src/index.html
```

## Project Dependencies

- Parcel (dev)

```
npm install -g parcel
```

- React

```
npm install --save react react-dom
```

## API Use

This SPA uses an API that I created. That section of the project can be found [here](https://github.com/raschkatie/movie_api).
