import { ReportUseCase } from '@/domain/use-case';
import { PrismaReportRepository, PrismaTransactionRepository, PrismaImageRepository } from '@/infra/database/prisma';
import { SheetJsReportServices } from '@/infra/services';
import { PrismaClient } from '@prisma/client';

export function ReportControllerFactory(): ReportUseCase {
  const prisma = new PrismaClient();
  const reportRepository = new PrismaReportRepository(prisma);
  const transactionRepository = new PrismaTransactionRepository(prisma);
  const imageRepository = new PrismaImageRepository(prisma);
  const reportServices = new SheetJsReportServices();

  return new ReportUseCase(reportRepository, transactionRepository, imageRepository, reportServices);
}
