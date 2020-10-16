You can test the application on the [Heroku Demo](https://raulrozza-marvel-catalog.herokuapp.com).

# Marvel Catalog

This application was created to consume the Marvel Developer's API. This API provides data about Marvel's characters, comics, events and more. You can know more about it by [clicking here](https://developer.marvel.com/documentation/getting_started).

## About the App

This app was developed using ReactJS and Typescript, bootstraped by [Create React App](https://github.com/facebook/create-react-app).

By accessing the app, you can check Marvel's comics and characters, as well as detailed information about them, such as: the comics creators, what comics is a character in, and more. You can also check the Stats page to discover the characters with most comic books ever, and the comics with most characters.

The app is fully responsive, and you can add it to your home page as a PWA.

## Libraries

Some additional libraries were used to build the app's interfaces:

- **Axios:** HTTP client used to connect with the Marvel API.
- **React ChartJs:** A React wrapper for the ChartJS library, used for building charts and displaying data.
- **React Helmet:** Library used to alter the page's head attributes.
- **React Icons:** A library that provides various icons from multiple icon sources.
- **React Infinite Scroll Component:** A nice library used to create the Infinite Scroll on the data listing pages.
- **React Loading:** Component used to render a loading animation.
- **React Router Dom:** Common library used for routing the app's pages.
- **React Toastify:** A great library for displaying toast messages. Used to return feedback to user on connection errors.
- **Recoil:** A state management library for React. Used to enable communication between the SearchBar component and the listing pages.
- **Styled Components:** Great library for component styling, enabling the use of JavaScript inside CSS syntax.

## Testing

You can easily test this app in your machine by cloning this repository. Then, on the project folder, run

`npm install`

or

`yarn`

to install all dependencies.

You will also need to set your Marvel API public key as an environment variable.

To do this, simply create a `.env` file on the root folder, with the following line:

`REACT_APP_PUBLIC_KEY = YOUR_KEY`

After everything is set, you can run `npm start` to run the app on your localhost.
