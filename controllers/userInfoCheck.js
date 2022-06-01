const fetch = require('node-fetch');
const { getAgeFromBirthDate } = require('../utils');
const fs = require('fs');
const path = require('path');

exports.sendRequest = async (request, response) => {

    //Get all info of userid and username
    const userApi = "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json"
    const res = await fetch(userApi, {'method': 'GET'})
    const users = await res.json()
    
    //Get all submitted wish request in every 15secs
    let datajson = fs.readFileSync(path.join(__dirname, '../public/assets/fakeData/store.json'), 'utf8');
    let userArr = datajson ? JSON.parse(datajson) : [];
    let userId = ''

    // Get userid from given username
    for(let user of users) {
      if(user.username == request.body.username) {
        userId = user.uid
        break
      }
    }

    // Check if user is registered or not
    if(userId === '') {
        //redirect to alert msg with error
        response.redirect('/alert-msg?alert=error-not-registered')
    } else {
        // if user is registered then fetch all user info with userid
        const userProfileApi = "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json"
        const getUsersInfo = await fetch(userProfileApi)
        const usersInfo = await getUsersInfo.json()
      
        for(let info of usersInfo) {
          if(info.userUid == userId) {
            let age = getAgeFromBirthDate(info.birthdate)
            //Check if user is under 10 or not
            if(age > 10) {
                //redirect to alert msg with error
                response.redirect('/alert-msg?alert=error-over-age')
            } else {
                let userInfo = {}
                userInfo.age = getAgeFromBirthDate(info.birthdate) 
                userInfo.id = userId;
                userInfo.username = request.body.username;
                userInfo.address = info.address;
                userInfo.wish = request.body.wish;
                userArr.push(userInfo)

                //save all user data in every 15secs
                fs.writeFile(path.join(__dirname, '../public/assets/fakeData/store.json'), JSON.stringify(userArr), err => {
                    if (err) throw err;
                })
                //redirect to alert msg with success
                response.redirect('/alert-msg?alert=success')
            }  
          }
        }
    }
}