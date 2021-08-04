const id = require('shortid');
const bc = require('bcrypt');
const { Administrator } = require('../models');


const index = async(req, res) => {
    const admins = await Administrator.findAll()
  try {
      if (admins) {
          return await res.status(200).json({
              msg: 'success',
              admins
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
    const { name, gender, email, password, role } = req.body;
    const admins = await Administrator.findAll({where: {email: email}})
    try {
        if (admins.length >= 1) {
            return await res.status(409).json({
                error: {
                    message: 'user with this email already exist',
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
                Administrator.create({
                    adminId: id(),
                    name,
                    gender,
                    email,
                    password: hash,
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
    const findById = await Administrator.findByPk(id)
  try {
   if(!findById){
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
          admin: findById
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
    const findById = await Administrator.findByPk(id)
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
                    await Administrator.update({
                        name,
                    gender,
                    email,
                    password: hash,
                    }, { where: { adminId: id } })
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
  const findById = await Administrator.findByPk(id)
  try {
    if(!findById){
       return await res.status(404).json({
           error: {
               msg: 'Not Found',
               statusCode: 404
           }
       })
    } else {
        await Administrator.destroy({ where: { adminId: id } })
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
