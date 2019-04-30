const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class ProviderController {
  async index (req, res) {
    const { id } = req.session.user

    const schedule = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        provider_id: id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      }
    })

    res.render('providerDashboard', { schedule })
  }
}

module.exports = new ProviderController()
