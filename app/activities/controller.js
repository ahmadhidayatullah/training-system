const Activity = require('../activities/model')
const { validationResult } = require('express-validator');

module.exports = {
  index: async (req, res, next) => {
    try {

      const { skill_id } = req.params

      const myCustomLabels = {
        totalDocs: 'totalItems',
        docs: 'activities',
        limit: 'pageSize',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'totalPages',
        pagingCounter: 'slNo',
        meta: 'paginator'
      };

      const query = {
        skill: skill_id
      }

      const options = {
        page: 1,
        limit: 2,
        customLabels: myCustomLabels,
        populate: ['participants', 'skill']
      };

      let activities = await Activity.paginate(query, options);

      res.status(200).json({ activities })

    } catch (err) {
      next(err)
    }
  },

  register: async (req, res, next) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: 'Data cannot be processed',
          errors: errors.array()
        });
      }

      const payload = req.body

      let activity = new Activity(payload)

      await activity.save()

      res.status(200).json({ message: 'create success' })

    } catch (err) {
      next(err)
    }
  },

  update: async (req, res, next) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: 'Data cannot be processed',
          errors: errors.array()
        });
      }

      const { ID } = req.params

      const { skill, title, description, start_date, end_date, participants } = req.body

      let data = await Activity.findByIdAndUpdate(
        { _id: ID },
        { skill, title, description, start_date, end_date, participants }
      )

      res.status(200).json({ message: 'update success' })

    } catch (err) {
      next(err)
    }
  },

  deleteData: async (req, res, next) => {
    try {

      const { ID } = req.params;

      await Activity.findOneAndRemove({
        _id: ID
      });

      res.status(200).json({ message: 'delete success' })

    } catch (err) {
      next(err)
    }
  }
}