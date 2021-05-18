'use strict'

exports.baseResponse = async (req, res, next) => {

    if (res.errors) console.log('VALIDATION ERROR:: => ', res.errors);

    let resultMessages = [
        {
            MessageType: res.hasError !== true ? 'success' : 'danger',
            Message: res.message,
            Errors: res.errors === undefined ? [] : res.errors
        }
    ]
    if (!res.hasError) {
        return res.status(200).json({
            HasError: res.hasError,
            ResultMessages: resultMessages,
            result: res.result,
            // token: res.token
        });
    } else {
        return res.status(500).json({
            HasError: res.hasError,
            ResultMessages: resultMessages,
            result: res.result
        });
    }
}