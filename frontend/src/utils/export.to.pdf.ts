import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (
    title: string,
    columns: string[],
    data: (string | number)[][],
    fileName: string,
) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(14);
    doc.text(title, 14, 15);

    // Table
    autoTable(doc, {
        head: [columns],
        body: data,
        startY: 25,
    });

    // Download
    doc.save(`${fileName}.pdf`);
};
