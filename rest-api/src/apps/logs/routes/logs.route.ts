import * as express from 'express'
import { LogsController } from '../controlles/logs.controller'

export const LogsRoute: express.Router = express
  .Router()
  .get('/', LogsController.getLogs)
