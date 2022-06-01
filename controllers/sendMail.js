const store = require('store')
var fs = require('fs');
const path = require('path');
exports.sendMail = () => {
    let datajson = fs.readFileSync(path.join(__dirname, '../public/assets/fakeData/store.json'), 'utf8');
    let userArr = JSON.parse(datajson);

    if(userArr.length > 0) {
        let htmlBody = ''
        const nodemailer = require('nodemailer');

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.EMAIL_CRED_USER,
                pass: process.env.EMAIL_CRED_PASS
            }
        });

        userArr.forEach((item, index)=>{
            htmlBody += `<h2>Request-${index + 1}</h2><p>Name: ${item.username}</p><p>Address: ${item.address}</p><p>Wish: ${item.wish}</p>`
        })

        // Message object
        let message = {
            from: 'do_not_reply@northpole.com',
            to: 'santa@northpole.com',
            subject: 'Gift Request',
            text: '',
            html: htmlBody
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            if(info.response) {
                fs.writeFile(path.join(__dirname, '../public/assets/fakeData/store.json'), JSON.stringify([]), err => {
                    if (err) throw err;
                })
            }
        })
    }  
}