import { Report } from '../entities/Report';
import { IReportRepository } from '../repositories/IReportRepository';

export class ReportUseCase {
  constructor(private iReportRepository: IReportRepository) {
    //
  }
  async save(report: Report): Promise<Report | null> {
    return await this.iReportRepository.save(report);
  }
  async findByClientId(clientId: number): Promise<Report[]> {
    return await this.iReportRepository.findByClientId(clientId);
  }
  async findById(reportId: number): Promise<Report | null> {
    return await this.iReportRepository.findById(reportId);
  }
  async findAll(): Promise<Report[]> {
    return await this.iReportRepository.findAll();
  }
  async update(report: Report): Promise<Report | null> {
    return await this.iReportRepository.update(report);
  }
  async delete(reportId: number): Promise<Report | null> {
    return await this.iReportRepository.delete(reportId);
  }
}
