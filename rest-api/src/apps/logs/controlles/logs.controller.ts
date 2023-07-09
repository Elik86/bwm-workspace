import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Log } from "../../../entity/log";
import { SortFilter } from "../../../types/filters";
import { Response } from "../../../types/response";
import LogsService from "../services/logs.service";

/**
 * @class LogsController
 */

export class LogsController {
  /**
   * @description retrieves logs
   * @param {ExpressRequest} req express request
   * @param {ExpressResponse} resp express response
   * @returns {Logs[]} logs data
   */

  public static async getLogs(
    req: ExpressRequest,
    resp: ExpressResponse
  ): Promise<void> {
    const responseObj: Response<Log[]> = { code: 200, data: [] };
    try {
      const sort: SortFilter = (req.query.sort as SortFilter) || "DESC";
      const severity: string = req.query.severity as string;

      const data = await LogsService.getLogs(sort, severity);
      responseObj.data = data;
    } catch (err) {
      responseObj.code = 400;
    } finally {
      resp.status(responseObj.code).send(responseObj);
    }
  }
}
