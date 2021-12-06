const router = require('express').Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'chicupatel222120@gmail.com',
        pass: 'hahahihi',
    },
    secure: true,
});

router.route('/send').post((req, res) => {
    const { to, subject, text, testName, totalCorrect, totalWrong, testMinutes, testSeconds  } = req.body;
    const mailData = {
        from: 'chicupatel222120@gmail.com',
        to: to,
        subject: subject,
        text: text,        
        html: '<h3><b><u>'+testName+'</u></b></h3><p></p><br>Total Correct : '+totalCorrect+'<br/><br>Total Wrong : '+totalWrong+'<br/><br>Time : '+testMinutes+'M : '+testSeconds+'S <br/>',
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});

module.exports = router;