# **`Métier`** (Yong Hong - Competency Project)

- [Installation dependencies](##installation-dependencies)
- [How to Use This App](##how-to-use-this-app)
- [Site Navigation and Features](##Site-Navigation-&-features)
- [Foler Structure](##folder-structure)
- [Authors and Acknowledgments](###authors-and-acknowledgments) 

This Competency Project was created with a full MERN(Mongo, Express, React, Node) Stack. This site allows someone to find listings of job positions. The user can also be an employer who can create job positions for other users to apply to.  

---

## `Installation dependencies`  

> Make sure you start mongoDB, so a database can be initalized with pre-data when the project is started.  

Open up the project folder in your terminal. You will see two major folders: `client` and `server`.  
```
hong-yong-f53855-competency/  
├── client/  
├── server/  
└── README.md  
```

1.) cd into `client`, and install client folder dependencies.  
```bash
$ cd client
$ npm i
```
2.) cd into `server`, and install server folder dependencies.  
```bash
$ cd ..
$ cd server
$ npm i
```

3.) Once all modules are installed; in the `server/` directory, type the following in terminal to start the competency project. This will run the scripts to start the server and seed pre-data, and it will also run the client side automatically. 
>#### To Run the Server
```bash
$ npm run dev
```
---
## `How to Use This App`  
### <u>***USER***</u>
#### `Home Page / Landing`  
There are a couple of blurbs that describe what the app is for.
- A carousel to show the definition of the word métier.
- ***`Signup`*** by creating a new account with any email and password. It will immediately take you to the User interface.
- Once an account is created, you can ***`Login`*** any subsequent time you visit the site.  


#### `Signup`  
- Enter email and passwords.
- Click on 'Submit' to create a user account, and start using the site/app.  
#### `Login`  
- If you have signed up and created a user account, enter email and password.  
- Click 'Submit' to start using the site/app.
#### `Dashboard`
- You will land on the `dashboard`, where it displays snippets of information of the user/employer. You can navigate the interface with the cards as well. 
  - USER(info)  
  1.) number of bookmarked jobs.  
  2.) number of jobs applied to.  
  3.) last time your resume was updated.  
  - EMPLOYER(info)  
  1.) Create a new employer profile if one has not been created.  
  2.) number of job positions created.  
  3.) number of applicants applied to each job position.  
  4.) last time company profile was updated.


#### `Site Navigation & Features`  
There are different features for user/employer. Just toggle the ***`Toggle`*** to switch between the two.

![How to use the Metier Menu!](./client/public/image/menu.png "Metier's Menu")  

#### `Job List`  
- This will load a component that lists all the jobs available to see.
- Use the search bar to look for specific <u>**job titles**</u> and/or jobs in a <u>**city**</u>.  
  - Rubric requirement for `componentDidUpdate()` was done in SearchBarClass.jsx  
  - Try typing "~!@#$%^&*()_+" some of these non-alphanumeric characters in the input field.
- On the left with all the jobs listed, you can scroll/click the `view` button to see the description of the job and the company. 
  - you can see how long ago the job was posted.
  - job title, company name, city.
- Once you see a job your interested in, click the `bookmark` Icon to bookmark the job to see later.  
- You can also `apply` to the job, and allow the job employer to see your resume. So make sure your resume is up to date!

#### `Resume`  
- Update your resume for your (experience, education, skills).
- When you apply for a job, this is the information an employer will see.  

#### `Mark'd & Applied`  
- You can see all the `bookmark'd` jobs, and the jobs you have `applied` to.

### <u>***EMPLOYER***</u>  
#### `Company Profile`  
- Once a Company Profile is created, the user can *add/delete* jobs.  
#### `Add Job`  
- Here you fill out a form to create a job.  
#### `Open Positions`  
- See the jobs you have created.  
  - Rubric requirement for `componentDidMount()` was done in OpenPositionsClass.jsx
- Remove any of the jobs created by you.
- View any of the applicant's **resume** who have applied to the job position.
  - you can see how long ago the applicant applied in the table and email for contact.  

#### `Error Page / 404` 
- User will be directed to a custom 404 Page if url does not exist.

---
## `Folder Structure`
### 
```
hong-yong-competency  
├── client  
|   └── public/  
|   ├── src/  
|   |   ├── api/  
|   |   ├── components/ 
|   |   |   ├── CustomButton/ 
|   |   |   ├── CustomJumbotron/ 
|   |   |   ├── Footer/ 
|   |   |   ├── Navigation/ 
|   |   |   ├── PageTemplate/ 
|   |   |   └── SideNav/ 
|   |   ├── lib/ 
|   |   ├── pages/ 
|   |   |   ├── ErrorPage/ 
|   |   |   ├── LoginPage/ 
|   |   |   ├── MainPage/ 
|   |   |   └── UserPage/  
|   |   └── index.js  
|   └── package.json  
|
|
|
├── server/ 
|   └── src/ 
|       ├── auth/ 
|       ├── resources/ 
|       |   ├── company/ 
|       |   ├── job/ 
|       |   └── user/  
|       ├── util/ 
|       ├── index.js 
|       └── server.js 
|
|
└── README.md  
```

---
### Authors and Acknowledgments  

This was coded by Yongbae.




