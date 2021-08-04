const id = require('shortid');
const bc = require('bcrypt');
const { ipcRenderer } = require('electron');
const { Payment } = require('../models');


const index = async(req, res) => {
    const payment = await Payment.findAll()
  try {
      if (payment) {
          return await res.status(200).json({
            msg: 'success',
            statusCode: 200,
              payment
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
  const { passengerId, trainNameNumber, classes, fare, source, destination, departure, arrival } = req.body;
  console.log(req.body)
    try {
                Payment.create({
                  paymentId: id(),
                  passengerId,
                    trainNameNumber,
                    class: classes,
                    fare,
                  source,
                  destination,
                    departure,
                    arrival
                })
            return res.status(201).json({
              msg: "success",
              statusCode: 201
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
    const payment = await Payment.findAll({where: {passengerId: id}})
  try {
   if(!payment){
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
        payment,
          pageSize: payment.length
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
  const { trainNameNumber, classes, fare, source, destination, departure, arrival } = req.body;
    const findById = await Payment.findByPk(id)
    try {
      if (!findById) {
        return await res.status(404).json({
          error: {
            msg: 'Not Found',
            statusCode: 404
          }
        })
      }
        
           await Payment.update({
             trainNameNumber,
             class: classes,
             fare,
             source,
             destination,
             departure
           }, { where: { paymentId: id } });
  return res.status(200).json({
    msg: 'success',
    statusCode: 200,
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

const destroy = async(req, res) => {
  const { id } = req.params
  const findById = await Payment.findByPk(id)
  try {
    if(!findById){
       return await res.status(404).json({
           error: {
               msg: 'Not Found',
               statusCode: 404
           }
       })
    } else {
        await Payment.destroy({ where: { paymentId: id } })
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
