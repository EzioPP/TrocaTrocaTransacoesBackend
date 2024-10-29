import { Report as ReportPrisma } from '@prisma/client';
import { Report } from '@/domain/entities';

export class ReportMappper {
  static toDomain(report: ReportPrisma): Report {
    return new Report(
      report.id_relatorio,
      report.data_relatorio ?? new Date(),
      '',
      report.id_cliente ?? 0,
      report.id_imagem ?? 0,
    );
  }

  static toPersistence(report: Report): ReportPrisma {
    return {
      id_relatorio: report.reportId,
      data_relatorio: report.reportDate,
      id_cliente: report.clientId,
      id_imagem: report.imageId,
    };
  }
}
