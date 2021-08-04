const id = require('shortid');
const bc = require('bcrypt');
const { Passenger } = require('../models');


const index = async(req, res) => {
    const passenger = await Passenger.findAll()
  try {
      if (passenger) {
          return await res.status(200).json({
              msg: 'success',
              passenger
       })
   }
  }
  catch (error) {
    return res.status(500).json({
        error: {
            msg: 'Server Error',
            statusCode: 500
      } 
    })
  }
  
}



const create = async (req, res) => {
    const { name, gender, email, password, contactAdd, nokPhone, role } = req.body;
    const passenger = await Passenger.findAll({where: {email: email}})
    try {
        if (passenger.length >= 1) {
            return await res.status(409).json({
                error: {
                    msg: 'user with this email already exist',
                    status: 409
                }
            })
        }
        else await bc.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: {
                        msg: 'Server Error',
                        statusCode: 500
                    }
                })
            } else {
                Passenger.create({
                    passengerId: id(),
                    name,
                    gender,
                    email,
                  password: hash,
                  contactAdd,
                    nokPhone,
                    role
                })
            }
            return res.status(201).json({
                msg: "success",
                statusCode: 201
            })
        })
    }
        
  catch (error) {
        return res.status(500).json({
            error: {
                msg: "Server Error",
                statusCode: 500
        }
    })
  }
  
}

const show = async(req, res) => {
    const { id } = req.params;
    const passenger = await Passenger.findByPk(id)
  try {
   if(!passenger){
       return await res.status(404).json({
           error: {
               msg: 'Not Found',
               statusCode: 404
           }
       })
      }
      return res.status(200).json({
          msg: 'success',
          statusCode: 200,
          passenger
      });
  }
  catch (error) {
    return res.status(500).json({
      error: {
                msg: "Server Error",
                statusCode: 500
        }
    })
  }
}


const update = async(req, res) => {
    const { id } = req.params;
    const findById = await Passenger.findByPk(id)
    try {
        if (!findById) {
            return await res.status(404).json({
                error: {
                    msg: 'Not Found',
                    statusCode: 404
                }
            })
        } else {
            await bc.hash(req.body.password, 10, async(err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: {
                            msg: 'Server Error',
                            statusCode: 500
                        }
                    })
                } else {
                    await Passenger.update({
                        name,
                    gender,
                    email,
                  password: hash,
                  contactAdd,
                    nokPhone
                    }, { where: { passengerId: id } })
                    return res.status(200).json({
                        msg: 'success',
                        statusCode: 200,
                    });
                }
            })
        }
    }
  catch (error) {
    return res.status(500).json({
      error: {
                msg: "Server Error",
                statusCode: 500
        }
    })
  }
  
}

const destroy = async(req, res) => {
  const { id } = req.params
  const findById = await Passenger.findByPk(id)
  try {
    if(!findById){
       return await res.status(404).json({
           error: {
               msg: 'Not Found',
               statusCode: 404
           }
       })
    } else {
        await Passenger.destroy({ where: { passengerId: id } })
        return res.status(200).json({
            msg: 'success',
            statusCode: 200,
        }); 
    }
       
  }
  catch (error) {
    return res.status(500).json({
      error: {
                msg: "Server Error",
                statusCode: 500
        }
    })
  }
  
}


module.exports = { index, create, show, destroy, update }
