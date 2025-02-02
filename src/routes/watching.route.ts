import express from 'express'
import { Watching } from '../types/Watching.type'
import WatchingService from '../services/watching.service'
import passport from 'passport'
import { User, JwtRequestType } from '../types/User.type'

const router = express.Router()
const service = new WatchingService()

router.post('/', passport.authenticate('jwt', { session: false}), async(req: JwtRequestType, res) => {
    const watching: Watching = req.body
    
    const newWatching = await service.create(watching)
    
    res.status(201).json(newWatching)
});

router.get('/all', async(req: JwtRequestType, res, next) => {
    try {
        const { user } = req
        console.log(user)
        const watches = await service.findAll()
        res.status(200).json(watches)
    } catch (error) {
        next(error)
    }
});

router.get('/registro/:id', async (req, res, next) => {
    try {
        const watching = await service.findById(req.params.id)
        res.status(200).json(watching)
    } catch (error) {
        next(error)
    }
});

router.get('/eliminar/:id', async (req, res, next) => {
    try {
        const watching = await service.deleteById(req.params.id)
        res.status(200).json(watching)
    } catch (error) {
        next(error)
    }
});

router.post('/editar/:id', async (req, res, next) => {
    try {
        const watching: Watching = req.body
        const newWatching = await service.editById(req.params.id, watching)
        res.status(201).json(newWatching)
    } catch (error) {
        next(error)
    }
});

router.get('/user/:user', async (req: JwtRequestType, res) => {
    try {
        const user = req.params.user
        const watches = await service.findByUser(user)
        res.status(200).json(watches)
    } catch (error) {
        console.error('Error al buscar por user:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

export default router