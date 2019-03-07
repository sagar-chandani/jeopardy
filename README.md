# Joepardy 

## Objective :
To calculate Inverted Term Frequecy and use that to find similarity between user's query and the questions I have in my Dataset.


# Python-flask on Pythonanywhere.com

## I hosted backend on pythonanywhere.com at : sagarchandani.pythonanywhere.com

In the Jeopardy dataset, there are many text fields such as Jeopardy type, air date, score number, Questions and Answers in string format and can be used directly, but fields like questions, Answer and Jeopardy type are in list of dict format so first I have converted string to literal structure then I have extracted only necessary fields such as Quetion and Answer. I have only extracted name of question, answer, type of jeopardy which is good source of information.
In the end I have constructed document for each jeopardy that contains all the text data mentioned above.
For better results I have applied snowball stemmer.

To find similarity between search query and questions and answer first I have combined the questions answer Jeopardy type fields and generated word vector of Combined data using word vectors inverted term frequency was calculated.
Now for new query we need to generate word vector of query and then calculate inverted term frequency. After that we need to calculate cosine similarity between inverted term frequency of query and of each movie. Then we will find top results whose cosine similarity is maximum.


## Libraries Used :

[1] https://scikit-learn.org/stable/

[2] http://www.numpy.org/

[3] https://pandas.pydata.org/

## References of code :
[1] https://medium.com/analytics-vidhya/connecting-a-machine-learning-model-to-a-web-dashboard-using-flask-and-react-3552c1cfc780

[2] https://medium.com/greyatom/an-introduction-to-bag-of-words-in-nlp-ac967d43b428

[3] https://towardsdatascience.com/multi-class-text-classification-with-scikit-learn-12f1e60e0a9f

[4] http://www.nltk.org/howto/stem.html

[5] https://stackoverflow.com/questions/12118720/python-tf-idf-cosine-to-find-document-similarity

# React Application on Heroku

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify






