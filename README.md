# Site for pub-quiz game

React based project for clients of offline quiz game.
Made as an info page to check out team statistics, photos from game.
The subject game is not that popular now, due to lack of russian-speaking population in Finike. That's why development is terminated.

Deploy: https://quiz-finike.web.app/

Stack: vite, react, typescript, redux, scss, i18next, firebase

## Features

- User authentication by email, google
- Games statistics
  - under user login displays statistics of user team
  - compare with other teams
  - complicated rules like: best rival, best game, played games streak
- Access to firebase database storage
  - post and get deeply nested game objects
  - object control in redux
- Access to firebase storage
  - get photos for gallery
- Photo gallery
  - custom render window
  - swiper carousel for opened photos
- Games announcement
- scss media rules on place

## Setup

For development run:

```bash
yarn install
yarn dev
```
