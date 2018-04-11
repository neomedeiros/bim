var DiffModel = require('../domain/diffModel');

var diffService = function () {}

diffService.prototype.storeValue = function (code, side, value) {
    return new Promise((resolve, reject) => {
        if (code == undefined || code == '')
            reject(new Error('invalid code - you should inform you code to handle your diff.'));

        if (value == undefined || value == '')
            reject(new Error('invalid value - it needs to be a valid sequence of chars'));

        if (side != 'left' && side != 'right')
            reject(new Error('invalid side - shoud be left or right.'));

        var diff = {
            code: code
        };

        if (side == 'left')
            diff.left = value;
        else
            diff.right = value;

        DiffModel.findOneAndUpdate({
                'code': code
            },
            diff, {
                upsert: true
            },
            function (err, doc) {
                if (err) {
                    console.log(`Error trying to save on storage: ${err.message}`)
                    reject(err);
                }
                resolve();
            });
    });
};

diffService.prototype.compare = function (code) {

    return new Promise((resolve, reject) => {
        if (code == undefined)
            reject(Error('Invalid code'));

        DiffModel.findOne({
                'code': code
            })
            .then((diffData) => {                

                var comparisonResult = {};

                if (!diffData)
                    comparisonResult.message = 'empty_data';

                else if (diffData.left == undefined || diffData.left == '')
                    comparisonResult.message = 'insuficient_data_left';

                else if (diffData.right == undefined || diffData.right == '')
                    comparisonResult.message = 'insuficient_data_right';

                else if (diffData.left === diffData.right)
                    comparisonResult.message = 'content_identical';

                else
                    comparisonResult.message = 'content_different';

                resolve(comparisonResult);
            })
    });
}

module.exports = diffService;