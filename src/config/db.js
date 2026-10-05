require('dotenv').config();

const {Prismapg} = require("@prisma/adapter-pg")
const { PrismaClient } = require('@prisma/client');

const adaptador = new Prismapg({
    connectionString: process.env.DATABASE_URL
})

const prisma = new PrismaClient({adaptador})

module.exports = prisma;