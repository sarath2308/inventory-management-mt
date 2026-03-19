import * as XLSX from "xlsx";

export const exportToExcel = <T extends object>(data: T[], fileName: string) => {
    if (!data || data.length === 0) {
        console.warn("No data to export");
        return;
    }

    // Convert JSON → worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Add worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    // Trigger download
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
