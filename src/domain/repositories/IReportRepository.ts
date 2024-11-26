import { Report } from '../entities/Report';

export interface IReportRepository {
  save(report: Report): Promise<Report | null>;
  findByClientId(clientId: number): Promise<Report[]>;
  findById(reportId: number): Promise<Report | null>;
  findAll(): Promise<Report[]>;
  update(report: Report): Promise<Report | null>;
  delete(reportId: number): Promise<Report | null>;
}
