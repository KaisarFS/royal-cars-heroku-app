const { User, Profile, Car } = require('../models/index')
const { Op } = require('sequelize')
const convertCurrencyRupiah = require("../helpers/currency")
const { resolve } = require('path')

class Controller {
    static renderHome(req, res) {
        const { category } = req.query
        // console.log(category, '<<<<<<<<<<');
        Car.getCarCategory(category)
            .then(resolve => {
                res.render('index', {resolve, convertCurrencyRupiah})
            })
            .catch(err => res.send(err))

        // Car.findAll()
        //     .then(resolve => {
        //         res.render('index', { resolve, convertCurrencyRupiah })
        //     })
        //     .catch(err => {
        //         res.send(err)
        //     })
        
    }

    static renderAddCar(req, res) {
        const id = req.params.id
        let error = req.query.errors?JSON.parse(req.query.errors):''
        res.render('booking')
    }

    static addCar(req, res) {
        let car = {
            brand: req.body.brand,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            imageUrl: req.body.imageUrl,
        }
        Car.create(car)
            .then((resolve) => {
                res.redirect(`/cars`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static renderDetailCar(req, res) {
        let id = req.params.id
        console.log(id);
        Car.findByPk(id, {
            include: {
                model: User,
                include: {
                    model: Profile,
                }
            }
        })
            .then(data => {
                console.log(data, "============");
                res.render('carDetail', { data, convertCurrencyRupiah })
            })
            .catch(reject => {
                console.log(reject);
                res.send(reject)
            })
    }

    /*
    include: {
        model: Profile
    }
    */

    static renderEditCar(req, res) {
        let id = req.params.id

        Car.findByPk(id)
            .then(data => {
                console.log(data, "========= EDITTT");
                res.render('carEdit', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editCar(req, res) {
        let id = req.params.id
        let edit = {
            brand: req.body.brand,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            imageUrl: req.body.imageUrl,

        }

        Car.update(edit, {
            where: {
                id: id
            }
        })
            .then(resolve => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static renderDeleteCar(req, res) {
        let id = +req.params.id
        Car.destroy({
            where: {
                id: id
            }
        })
            .then(resolve => {
                res.redirect('/')
            })
            .catch(reject => {
                res.send(reject)
            })
    }

}

module.exports = Controller