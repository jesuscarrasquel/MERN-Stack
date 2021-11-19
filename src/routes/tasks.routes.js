const express = require('express')
const router = express.Router()
const task = require('../models/task')

router.get('/', async (req, res) => {

    const tasks = await task.find()
    res.json(tasks)

})

router.get('/:id', async (req, res) => {
    const Task = await task.findById(req.params.id)
    res.json(Task)
})

router.post('/', async (req, res) => {
    const { title, description } = req.body
    const Task = new task({title, description})
    await Task.save()
    res.json({status: 'Task Saved'})
})

router.put('/:id', async (req, res) => {
    const { title, description } = req.body
    const newTask = {title, description}
    await task.findByIdAndUpdate(req.params.id, newTask)
    res.json({status: 'Task Updated'})
})

router.delete('/:id', async (req, res) => {
    await task.findByIdAndRemove(req.params.id)
    res.json({status: 'Task deleted'})
})

module.exports = router