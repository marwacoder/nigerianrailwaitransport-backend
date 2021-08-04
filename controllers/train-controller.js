const id = require('shortid');
const { Train, Ticket } = require('../models');
const {validationResult} = require('express-validator');






    
      
const index = async (req, res) => {
  const train = await Train.findAll()
 
  try {
    if (train) {
      
      return res.status(200).json({
        train: train,
        pageSize: train.length,
        
      })
    }
    return await res.status(400).json({
      error: {
        statusCode: 400,
        message: 'Bad Request'
          }
      })
  }
  catch (error) {
    if (error) {
      return res.status(500).json({
        error: {
          message: 'Server Error', statusCode: 500
        }
      })
    }
  }
 }


       
const trainTicket = async (req, res) => {
  const { id } = req.params;
  const train = await Ticket.findAll({include: [{model: Train, as: 'train'}]},{where: {authId: id}})
 
  try {
    if (train) {
      return res.status(200).json({
        train: train,
        pageSize: train.length
      })
    }
    return await res.status(404).json({
      error: {
        statusCode: 404,
        message: 'Record Not Found'
          }
      })
  }
  catch (error) {
    if (error) {
      return res.status(500).json({
        error: {
          message: 'Server Error', statusCode: 500
        }
      })
    }
  }
 }


 
  const getRandomNumber = (min = 0, max = 500000) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString().padStart(6, '0')
}



const create = async (req, res) => {
  const { trainName,classes,quota, source, destination, capacity, departure,arrival, adminId } = req.body
  const train = await Train.findAll({ where: { trainName: trainName } });
 console.log(req.body)
  const errors = validationResult(req);
let rand = getRandomNumber(); 

  try {
    if (!errors.isEmpty()) {
                return res.status(422).json({
                    
                        msg: errors.array()[0].msg,
                    param: errors.array()[0].param,
                        error: 'error',
                        statusCode: 422
                        
                })
    }
    if (train.length < 1) {
    await  Train.create({
        trainId: id(),
        trainName: trainName,
        trainNumber:  rand,
        classes: classes,
        quota: quota,
        source: source,
        destination: destination,
        capacity: capacity,
        departure: departure,
        adminId: adminId,
        arrival: arrival
      })
      return await res.status(201).json({
        msg: 'success',
        statusCode: 201
      })    
    }
    else {
      return await res.status(409).json({
        msg: 'Train Exist',
        statusCode: 409
      
    })
    }
    
  } catch (error) {
    if (error) {
      return res.status(500).json({
          msg: 'Server Error',
          statusCode: 500
      })
    }
  }

}



const show = (req, res) => {
  const { id } = req.params
  try {
    Train.findByPk(id)
    .then((train) => {
      if (!train) {
        return res.status(404).json({ 
          error: {
          msg: 'Bad Request',
          statusCode: 400
        }
         });
      }
      return res.status(200).json({
        msg: 'success',
        statusCode: 200,
        train
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: {
          msg: 'Bad Request',
          statusCode: 400
        }
      })
    });
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


const update = async(req, res) => {
  const { id } = req.params;
  const train = await Train.findByPk(id)
  try {
    if (!train) {
      return await res.status(404).json({
        error: {
          msg: 'Record Not Found',
          statusCode: 404
        }
      })
    } else {
      await Train.update({
        ...req.body
      }, { where: { trainId: id } })
      return await res.status(201).json({
        msg: 'success',
        statusCode: 201
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

const destroy = async(req, res) => {
  const { id } = req.params;
  const train = await Train.findByPk(id)
  try {
    if (!train) {
      return await res.status(404).json({
        error: {
            msg: 'Record Not Found',
            statusCode: 404
          }
      })
    }
    else {
      Train.destroy({ where: { trainId: id } })
      return await res.status(201).json({
        msg: 'success',
        statusCode: 201
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

module.exports = { index, create, show, destroy, update, trainTicket}
