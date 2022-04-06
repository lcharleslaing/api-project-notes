const router = require('express').Router();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient;

const from = "projects" // await prisma.'users' (SHOULD MATCH)
const prismaObject = prisma.project

// Get All
router.get(`/${from}`, async (req, res, next) => {
  try {
    const records = await prismaObject.findMany({
      include: {
        tasks: true
      },
    })
    res.json(records)
  } catch (error) {
    next(error)
  }
});

// GET by ID
router.get(`/${from}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params
    const record = await prismaObject.findUnique({
      where: {
        id: Number(id)
      },
    })
    res.json(record)
  } catch (error) {
    next(error)
  }
});


// POST NEW
router.post(`/${from}`, async (req, res, next) => {
  try {
    const record = await prismaObject.create({
      data: req.body
    })
    res.json(record)
  } catch (error) {
    next(error)
  }
});


// DELETE by ID
router.delete(`/${from}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params
    const record = await prismaObject.delete({
      where: {
        id: Number(id)
      },
    })
    res.json(record)
  } catch (error) {
    next(error)
  }
});


// UPDATE by ID
router.patch(`/${from}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params
    const record = await prismaObject.update({
      where: {
        id: Number(id)
      },
      data: req.body
    })
    res.json(record)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
