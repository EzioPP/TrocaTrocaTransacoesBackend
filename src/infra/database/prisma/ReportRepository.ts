import { Report } from '@/domain/entities';
import { IReportRepository } from '@/domain/repositories';
import { ReportMappper } from '@/infra/mapper';
import { logger } from '../../logger/logger';

import { PrismaClient } from '@prisma/client';

export class PrismaReportRepository implements IReportRepository {
  constructor(private prisma: PrismaClient) {}

  async save(report: Report): Promise<Report | null> {
    try {
      const createdReport = await this.prisma.report.create({
        data: {
          data_relatorio: report.reportDate,
          id_cliente: report.clientId,
          id_imagem: report.imageId,
        },
      });
      return ReportMappper.toDomain(createdReport);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findById(reportId: number): Promise<Report | null> {
    try {
      const report = await this.prisma.report.findUnique({
        where: {
          id_relatorio: reportId,
        },
      });
      if (!report) return null;
      return ReportMappper.toDomain(report);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findAll(): Promise<Report[]> {
    try {
      const reports = await this.prisma.report.findMany({
        orderBy: {
          data_relatorio: 'desc',
        },
      });
      return reports.map((report) => ReportMappper.toDomain(report));
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  async findByClientId(clientId: number): Promise<Report[]> {
    try {
      const reports = await this.prisma.report.findMany({
        where: {
          id_cliente: clientId,
        },
      });
      return reports.map((report) => ReportMappper.toDomain(report));
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  async update(report: Report): Promise<Report | null> {
    try {
      const updatedReport = await this.prisma.report.update({
        where: {
          id_relatorio: report.reportId,
        },
        data: {
          data_relatorio: report.reportDate,
          id_cliente: report.clientId,
          id_imagem: report.imageId,
        },
      });
      return ReportMappper.toDomain(updatedReport);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
  async delete(reportId: number): Promise<Report | null> {
    try {
      const deletedReport = await this.prisma.report.delete({
        where: {
          id_relatorio: reportId,
        },
      });
      return ReportMappper.toDomain(deletedReport);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
