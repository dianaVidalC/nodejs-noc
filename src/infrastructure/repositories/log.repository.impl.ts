import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";


export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly dataSource: LogDatasource) {} //se puede cambiar a otro tipo de datasource

  async saveLog(log: LogEntity): Promise<void> {
    this.dataSource.saveLog(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.dataSource.getLogs(severityLevel);
  }
}
