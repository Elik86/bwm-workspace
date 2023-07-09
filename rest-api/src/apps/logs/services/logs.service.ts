import { SortFilter } from "@/types/filters";
import { AppDataSource } from "../../../data-source";
import { Log } from "../../../entity/log";
/**
 * @class LogsService
 */
class LogsService {
  /**
   * @description retrieves logs data
   * @returns {Promise<Log[]>} return logs from the db
   */
  async getLogsBasic(): Promise<Log[]> {
    return AppDataSource.manager.find(Log);
  }

  async getLogs(sort: SortFilter = "DESC", severity = ""): Promise<Log[]> {
    const query = AppDataSource.manager.createQueryBuilder(Log, "log");

    // check if severity filter is present
    if (severity) {
      query.andWhere("log.severity = :severity", {
        severity,
      });
    }

    // sort order
    query.orderBy("log.timestamp", sort);

    return query.getMany();
  }
}

export default new LogsService();
