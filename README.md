# V-RUS
[https://lowkangxuan.github.io/Integrated-Project-Y1.2/](https://lowkangxuan.github.io/Integrated-Project-Y1.2/)

The website features a statistical map of the current COVID-19 pandemic around the world, where users are able to interact with it and view the selected country's COVID-19 cases. There is also a linear chart where users are able to see the peak cases of the country since January 2020.

Other than that, the website also have multiple quizzes and store, where users are able to complete the quiz and learn more about the COVID-19 pandemic and educating them about the current pandemic situation. By completing the quizzes, users are able to gain points and have them spent in the store for necessities during this pandemic such as a pack of Surgical Masks.
 
## Design Process

When designing the website, I planned to have a cool blue and white combination with a dark blue colour as the main website colour. I try to add a triangle using css border on certain corners as part of the aesthetic design I was aiming towards.

The website is targetted mainly to those who wants to learn more about COVID-19 such as what we can do to prevent us from contracting the virus and at the same time gain knowledge on the current situation going on globally. The website features a leaderboard system for those who wants to play the quizzes available competitively and a shop for those who are looking for freebies or actual needs.

In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:
- As a learner, I would like to complete the quizzes, so that I can gain more knowledge on the COVID-19 pandemic and virus.
- As a gamer, I would like to complete the quizzes, so that I can see my usernmae at the top of the leaderboard.
- As a general user, I would like to explore the website and do some quizzes, so that I can understand the website better.

[Adobe XD Prototype](https://xd.adobe.com/view/b8328fdd-5fc2-4fe5-ace0-753a355e69bb-ed61/)

## Features 
### Existing Features
- Feature 1 - Allow users to gain points by completing quizzes with correct answers
- Feature 2 - Allow users to see the COVID-19 cases per country by navigating to the statistics page
- Feature 3 - Allow users to buy COVID-19 necessities by purchasing them from the V-RUS Shop

### Features to implement in the future
- A quick tip section for user to help with their quiz answers.
- A quick GUI for users to see the points they have left after spending them in the shop.

## Technologies Used
- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [Mapbox](https://docs.mapbox.com/)
    - The project uses **Mapbox** for the interactive map

- [ChartJS](https://www.chartjs.org/docs/latest/)
    - The project uses **ChartJS** to have a linear graph for the COVID-19 statistics

- [NovelCOVID API](https://documenter.getpostman.com/view/11144369/Szf6Z9B3?version=latest)
    - The project uses **NovelCOVID API** as the main "brain" of the web application and gather all COVID-19 statistics

- [Firebase](https://firebase.google.com/docs/web)
    - The project uses **Firebase** to store user information and data and also enable password sign in and sign up


## Testing

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Sign In/ Sign Up form:
    1. Go to the "Sign In" or "Sign Up" page
    2. Try to submit the empty form and verify that an error message appears
    3. Try to submit the form with an invalid username/email/password and verify that a relevant error message appears

2. Quiz form:
    1. Go to the "V-RUS Quiz" page
    2. Try to submit the empty form and verify that an error alert appears

### Mobile device experience
- The web application is coded for mobile first

### Bugs discovered
- When users complete multiple quizzes at once, they will get x2 the points they get previously. This bug have yet to be fixed.

## Credits

### Content

### Media
- The photos used in this site were obtained from [Pixabay](https://pixabay.com/)

### Acknowledgements
