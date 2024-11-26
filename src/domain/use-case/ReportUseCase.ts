import { Report } from '../entities/Report';
import { IReportRepository } from '../repositories/IReportRepository';
import { IReportServices } from '../services/IReportServices';
import { Transaction } from '../entities/Transaction';
import { ITransactionRepository } from '../repositories';
import { IImageRepository } from '../repositories/IImageRepository';
import { Image } from '../entities/Image';

export class ReportUseCase {
  constructor(private iReportRepository: IReportRepository,
    private readonly iTransactionRepository: ITransactionRepository,
    private readonly iImageRepository: IImageRepository,
    private iReportServices: IReportServices,
  ) {
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

  async generateReport(clientId: number, dateRange: string): Promise<Report | null> {
    const transactions = await this.iTransactionRepository.findByClientIdAndDateRange(clientId, dateRange);
    const buffer = await this.iReportServices.generateReport(transactions);
    const name = `report-${new Date().toISOString()}.xlsx`;
    const image = new Image(name, buffer, clientId);
    const imageRes = await this.iImageRepository.save(image);
    if (!imageRes) return null;
    const report = new Report(undefined, new Date(), 'xlsx', clientId, imageRes.imageId);
    return await this.iReportRepository.save(report);
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
