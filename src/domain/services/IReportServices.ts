import { Transaction } from '@/domain/entities';
export interface IReportServices {
    generateReport(transactions: Transaction[]): Promise<Buffer>;
}