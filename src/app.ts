import express, { Express, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import createHttpError from 'http-errors'
import dotenv from 'dotenv'

dotenv.config()

const createdBy: String = '-- drill(2022.Feb.10) ExpressJs X'
const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

app.get('/check', (req: Request, res: Response, next: NextFunction) => {
  res.send(`All OK! ${createdBy}`)
})

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound())
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status = err.status || 500,
  res.send({
    status: res.status,
    message: err.message
  })
})

const PORT: Number = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
  console.log(`Game! at port ${PORT} ${createdBy}`)
})

