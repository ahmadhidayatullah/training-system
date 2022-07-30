const { body } = require('express-validator');
const mongoose = require('mongoose')
const Skill = require('../skills/model')
const User = require('../users/model')

exports.validate = (method) => {
    switch (method) {
        case 'register': {
            return [
                body('skill', `Skill is invalid`).exists(),

                body('skill').custom(value => {

                    return Skill.findById(value).exec().then((data) => {
                        if (!data) {
                            return Promise.reject(`Skill doesn't exists`);
                        }

                        return false
                    }).catch(() => {
                        return Promise.reject(`Skill doesn't exists`);
                    })
                }),

                body('participants').custom(async (participants, {req}) => {
                    
                    let skill = await mongoose.Types.ObjectId(req.body.skill)

                    participants.forEach(async (participant) => {
                        let user = await User.findById(participant).exec()
                        
                        if (!user) {
                            throw new Error(
                                `${participant} doesn't exists`
                            )
                        }

                        // //todo: handling when user skill undifined
                        if (user.skill.toString() != skill.toString()) {
                            throw new Error(
                                `${participant} doesn't match with the skill`
                            )
                        }
                    });


                    return false
                }),

                body('title', `Title is invalid`).exists(),

                body('description', `Description is invalid`).exists(),

                body('start_date', `Start Date is invalid. Format date: yyyy-mm-dd`).exists().isDate(),

                body('end_date').trim().isDate().custom((end_date, { req }) => {

                    const [sy, sm, sd] = req.body.start_date.split('-')
                    const [ey, em, ed] = end_date.split('-')

                    const startDate = new Date(sy, sm, sd)
                    const endDate = new Date(ey, em, ed)

                    if (endDate <= startDate) {
                        throw new Error(
                            'End date must be after start date'
                        )
                    }
                    return true
                })
            ]
        }

        case 'update' : {
            return [
                body('skill', `Skill is invalid`).exists(),

                body('skill').custom(value => {

                    return Skill.findById(value).exec().then((data) => {
                        if (!data) {
                            return Promise.reject(`Skill doesn't exists`);
                        }

                        return false
                    }).catch(() => {
                        return Promise.reject(`Skill doesn't exists`);
                    })
                }),
 
                body('participants').custom(async (participants, {req}) => {
                    //get request skill
                    let skill = await mongoose.Types.ObjectId(req.body.skill)

                    //validation same skill with participants data
                    participants.forEach(async (participant) => {
                        let user = await User.findById(participant).exec()
                        
                        if (!user) {
                            throw new Error(
                                `${participant} doesn't exists`
                            )
                        }

                        // //todo: handling when user skill undifined
                        if (user.skill.toString() != skill.toString()) {
                            throw new Error(
                                `${participant} doesn't match with the skill`
                            )
                        }
                    });

                    return false
                }),

                body('title', `Title is invalid`).exists(),

                body('description', `Description is invalid`).exists(),

                body('start_date', `Start Date is invalid. Format date: yyyy-mm-dd`).exists().isDate(),

                body('end_date').trim().isDate().custom((end_date, { req }) => {

                    const [sy, sm, sd] = req.body.start_date.split('-')
                    const [ey, em, ed] = end_date.split('-')

                    const startDate = new Date(sy, sm, sd)
                    const endDate = new Date(ey, em, ed)

                    if (endDate <= startDate) {
                        throw new Error(
                            'End date must be after start date'
                        )
                    }
                    return true
                })
            ]
        }
    }
}