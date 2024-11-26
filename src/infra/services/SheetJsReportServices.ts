import { Transaction } from "@/domain/entities";
import { IReportServices } from "@/domain/services";
import * as XLSX from "xlsx";
export class SheetJsReportServices implements IReportServices {
    async generateReport(transactions: Transaction[]): Promise<Buffer> {
        const ws = XLSX.utils.json_to_sheet(transactions);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Transactions");
        return XLSX.write(wb, { type: "buffer" });
    }
}