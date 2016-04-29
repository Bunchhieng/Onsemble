# Onsemble
Onsemble is a promotional platform where undiscovered musicians can showcase their work to people in their surrounding communities and hope to be discovered.

The current version of this repository can be found here:
https://onsembleapp.herokuapp.com/

##Communication with the team
This is where our communication of code will be taking place.
[![Gitter](https://badges.gitter.im/Bunchhieng/Onsemble.svg)](https://gitter.im/Bunchhieng/Onsemble?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## How to work on this project
1. `git clone https://github.com/Onsemble-Dev/Onsemble.git`
2. `npm install` to install all modules in package.json
3. `node populateDB.js` This file is use to populate our database.


## Easy team workflow
#### **Please make sure you read this instruction before you push any changes.**
1. Clone the base project:             
`git clone https://github.com/Bunchhieng/Onsemble.git`
2. Make sure you create a new branch (based on development/master branch) every time you want to push a new fix or update. This won't be conflicted with everyone:                       
`git checkout -b your_branch master`                            
We decided to follow this naming convention for git branch name: your initial + version number. i.e: **bcs_v1**
3. Add any (files) change to the stage:                   
`git add .`
4. Then commit your change:                    
`git commit -m "your comment"`
5. Push changes to your new branch:                     
`git push -u origin your_branch`
6. Before we decide to merge with master, you need to `git push` to make sure that the central repo has your current commit.
7. After you push your code, make sure you pull request in github GUI so everyone knows what you changed.
8. Then we can decide to merge the change:
```
git checkout master
git pull
git pull origin your_branch
git push
```
## RESTFul API
| Link | Verb | Description |       
| ------------ | ------------- | ------------- |     
/api/users/ | GET | Get all user from database |     
/api/:userid/ | GET | Get specific user     
/api/:userid/ | UPDATE | Update specific user   
/api/:userid/ | DELETE | Delete specific user

## Timeline
Assignment # | Due date | Status | Person in charge
------------ | ------------- | ------------- | -------------
1. Proposal | Thursday, February 4, 2016 | Progressing | everyone
2. UI | Tuesday, February 12, 2016 | Progressing | Santiago and Justin
3. Database model | Tuesday, February 16, 2016| Progressing | Bun and Tak
4. Alpha version | Tuesday, March 1, 2016 | Progressing | everyone
5. Beta version | Tuesday, April 5, 2016 | Progressing | everyone
6. Bug fixes | Saturday, April 27| Progressing | everyone
