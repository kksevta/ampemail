var express = require('express');
var router = express.Router();
const utils = require('../helpers/utils');


router.get('/send', function (req, res) {
    const params = req.query;
    const receiverEmail = params.email;
    if (receiverEmail) {
        utils.sendPromotionalEmail(receiverEmail)
            .then(data => {
                res.json({
                    success: true,
                    response: {
                        envelope: data.envelope,
                        messageId: data.messageId
                    }
                });
            })
            .catch(error => {
                res.json({
                    success: false,
                    message: error.message
                });
            });
    } else {
        res.json({
            success: false,
            message: 'No recipient found'
        });
    }
});

module.exports = router;