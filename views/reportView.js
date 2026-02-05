// Report View - Maneja la vista de reportes
class ReportView {
    constructor() {
        this.reportsArea = document.getElementById('reportsArea');
    }

    renderReport(report) {
        if (!this.reportsArea) return;
        this.reportsArea.value = report;
    }

    downloadCSV(csvContent, filename = 'reporte.csv') {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
