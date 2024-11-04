import { ReportUseCase } from '@/domain/use-case';
import { PrismaReportRepository } from '@/infra/database/prisma';

import { PrismaClient } from '@prisma/client';

export function ReportControllerFactory(): ReportUseCase {
  const prisma = new PrismaClient();
  const reportRepository = new PrismaReportRepository(prisma);
  return new ReportUseCase(reportRepository);
}
