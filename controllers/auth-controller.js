const bc = require('bcrypt')
const jwt = require('jsonwebtoken');
const { Administrator, Passenger } = require('../models');




const auth = async (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body)
     const admin = await Administrator.findAll({ where: { email: username } }); 
    const passenger = await Passenger.findAll({where: { email: username } });
    

    try {
          
        if (admin.length <= 0 && passenger.length <= 0 ) {
                return await res.status(401).json({
                    msg: 'Invalid username or password',
                    statusCode: 401
                })
        }
        

        
      else if (admin.length > 0) {
            bc.compare(password, admin[0].password, async (err, result) => {
                if (err) {
                    return await res.status(401).json({
                        msg: 'Invalid username or password',
                        statusCode: 401
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: admin[0].email,
                        password: admin[0].password
                    }, 'secrete',
                        {
                            expiresIn: 3600
                        }
                    );
                     await res.status(200).json({
                        msg: 'success',
                        user: admin,
                        token: token,
                        expiresIn: 3600
                    })
                    return res.end()
                }
                return await res.status(401).json({
                    msg: 'Invalid username or password',
                    statusCode: 401
                })
            })
        }
         
       else if (passenger.length > 0) {
            bc.compare(password, passenger[0].password, async (err, result) => {
                if (err) {
                    return await res.status(401).json({
                        msg: 'Invalid username or password',
                        statusCode: 401
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: passenger[0].email,
                        password: passenger[0].password
                    }, 'secrete',
                        {
                            expiresIn: 3600
                        }
                    );
                     await res.status(200).json({
                        msg: 'success',
                        user: passenger,
                        token: token,
                        expiresIn: 3600
                    })
                    return res.end()
                }
                return await res.status(401).json({
                    msg: 'Invalid username or password',
                    statusCode: 401
                })
            })
        }
         
       
        }
        catch (error) {
            if (error) {
            return res.status(500).json({
            error: {
                    msg: 'Server Error'+ error,
                statusCode: 500
            }
           }) 
        }
        }
        

}


module.exports = {auth };