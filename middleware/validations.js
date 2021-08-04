const { body} = require('express-validator');


const validate = (method) => {
    switch (method) {
        case 'train': {
            return [
                body('trainName', 'train name cannot be empty').notEmpty(),
                body('classes', 'train class cannot be empty').notEmpty(),
                body('quota', 'train quota cannot be empty').notEmpty(),
                body('source', 'train source cannot be empty').notEmpty(),
                body('destination', 'train destination cannot be empty').notEmpty(),
                body('capacity', 'train capacity cannot be empty').notEmpty(),
                body('departure', 'train departure cannot be empty').notEmpty(),
                body('arrival', 'train arrival cannot be empty').notEmpty(),
                body('adminId', 'kindly SignIn').notEmpty(),
            ]
        }
    
            case 'donation': {
            return [
                body('donationName', 'donor name should not be empty').notEmpty(),
                body('donationContactPerson', 'donor contact address empty').notEmpty(),
                body('donationPhone', 'must be a valid phone Number').isMobilePhone(),
                body('donationPhone', 'donor phone Number should not be empty').isEmpty(),
                body('donationContact', 'must be a valid phone Number').isMobilePhone(),
                body('donationContact', 'donor phone Number should not be empty').isEmpty(),
                body('donationEmail', 'must be a valid email address').isEmail(),
                body('donationUse', 'use of donation should not be empty').notEmpty(),
                body('donationAddressOne', 'address1 should not be empty').isEmpty(),
                body('donationAddressTwo', 'address2 should not be empty').notEmpty().optional(),
                body('donationPickUp', 'pickup should not be empty').notEmpty().optional(),
                body('donationValue', 'what you want to donate should not be empty').notEmpty(),
                body('donationMessage', 'donor message should not be empty').notEmpty() 
            ]
        }
            case 'register': {
            return [
                body('firstName', 'must be a valid first name').notEmpty(),
                body('lastName', 'must be a valid last name').notEmpty(),
                body('email', 'must be a valid email address').isEmail(),
                body('phoneNumber', 'must be a valid phone Number').isMobilePhone(),
                body('password').custom((value, { req }) => {
                    if (value !== req.body.confirmPassword) {
                        throw new Error('password not matched');
                    }
                    return true;
                })

            ]
        }
            case 'id': {
            return [
                body('id', 'id must not be empty').notEmpty()
            ]
        }
    }
    
}

module.exports = { validate };