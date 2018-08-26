# Up2Date
This program is built as part of Assignment 3 for Advanced Internet Programming at the University of Technology, Sydney. Spring semester 2018.

It was developed by **Abhusha Bogati**, **Mitchell Clarke** and **Maggie Liuzzi**.



## Description

Up2Date is a news and social media aggregation web application. Its goal is to give users the speed and convenience of seeing all of the news and social media they are interested in, all in one place.  Its design aims to be "simple, but effective".



## Installation

To get the app running, you'll need **Node.js** and **npm** installed. If you do not have it, you can download them from here: https://nodejs.org/en/

You'll also need **MongoDB** installed for database connectivity to work. If you do not have it, you can download it from here: https://www.mongodb.com/download-center

Once these are installed, complete the following steps:

1. Clone this repo to a directory of your choice using git:

   ```shell
   git clone https://github.com/MJClarke93/Up2Date.git
   ```

2. Enter the new directory and install the dependencies:

   ```shell
   cd Up2Date
   npm install
   ```

3. Once the dependencies are installed, run the web app using:

   ```shell
   npm start
   ```

The React front-end runs on Port 3000, while the Express back-end runs on Port 3001.

To work with the database, open Mongod using your preferred method and leave it running in the background. The recommended database location is inside the project folder at ./data/db as this is excluded by the .gitignore.



## Style

For developers working on this project, adhere to the following style guidelines:

- Variables, objects, functions, methods and classes all use camel case with no underscores.

- Use sensible and informative names, even in loops (`i` as the iterator in some for loops is fine).

- Classes start with a upper case, while all others start with a lower case.

- Constants are written in all caps, with words separated using underscores.

- Use a comment to briefly describe what each component is at the top of its file.

- Use in-code comments to clarify, rather than to re-state the obvious.

- For control structures, stick to the following style:

  ```
  <keyword> <condition> {
      <code>
  } <extension> {
      <code>
  }
  ```

- Use four spaces for indentation, not tabs.

- Avoid excessively long lines of code - split across multiple lines as needed.
