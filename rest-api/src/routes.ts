import { Router } from 'express'
import { LogsRoute } from './apps/logs/routes/logs.route'

// Router interface to describe route path, potential middleware, sub route handler
interface IROUTER {
  path: string
  middleware: any[]
  handler: Router
}

export const ROUTER: IROUTER[] = [
  {
    handler: LogsRoute,
    middleware: [],
    path: 'logs',
  },
]
