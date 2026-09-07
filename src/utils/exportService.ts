
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BloodReport } from '@/types';

export const exportReportToPDF = async (report: BloodReport): Promise<void> => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header
  pdf.setFontSize(20);
  pdf.text('Blood Report Analysis', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  pdf.setFontSize(12);
  pdf.text(`Date: ${new Date(report.date).toLocaleDateString()}`, 20, yPosition);
  yPosition += 10;

  // Anthropometric Data
  if (report.anthropometric && (report.anthropometric.height || report.anthropometric.weight)) {
    pdf.setFontSize(14);
    pdf.text('Anthropometric Data', 20, yPosition);
    yPosition += 8;
    
    pdf.setFontSize(10);
    if (report.anthropometric.height) {
      pdf.text(`Height: ${report.anthropometric.height} cm`, 20, yPosition);
      yPosition += 6;
    }
    if (report.anthropometric.weight) {
      pdf.text(`Weight: ${report.anthropometric.weight} kg`, 20, yPosition);
      yPosition += 6;
    }
    if (report.anthropometric.bmi) {
      pdf.text(`BMI: ${report.anthropometric.bmi}`, 20, yPosition);
      yPosition += 10;
    }
  }

  // Pre-Dialysis Lab Values
  pdf.setFontSize(14);
  pdf.text('Pre-Dialysis Lab Values', 20, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  Object.entries(report.preHD).forEach(([key, value]) => {
    if (value !== undefined) {
      const displayName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      pdf.text(`${displayName}: ${value}`, 20, yPosition);
      yPosition += 6;
    }
  });

  yPosition += 5;

  // Post-Dialysis Lab Values (if available)
  if (Object.keys(report.postHD).length > 0) {
    pdf.setFontSize(14);
    pdf.text('Post-Dialysis Lab Values', 20, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    Object.entries(report.postHD).forEach(([key, value]) => {
      if (value !== undefined) {
        const displayName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        pdf.text(`${displayName}: ${value}`, 20, yPosition);
        yPosition += 6;
      }
    });
    yPosition += 5;
  }

  // Analysis (if available)
  if (report.analysis) {
    // Check if we need a new page
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(14);
    pdf.text('Analysis & Recommendations', 20, yPosition);
    yPosition += 8;

    // Overall Assessment
    pdf.setFontSize(12);
    pdf.text(`Overall Risk: ${report.analysis.overallRisk.toUpperCase()}`, 20, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    const summaryLines = pdf.splitTextToSize(report.analysis.summary, pageWidth - 40);
    pdf.text(summaryLines, 20, yPosition);
    yPosition += summaryLines.length * 6 + 5;

    // Alerts
    if (report.analysis.alerts.length > 0) {
      pdf.setFontSize(12);
      pdf.text('Lab Value Alerts:', 20, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      report.analysis.alerts.forEach((alert) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }
        
        const alertText = `• ${alert.parameter}: ${alert.value} (${alert.status}, ${alert.severity})`;
        pdf.text(alertText, 20, yPosition);
        yPosition += 6;
        
        const explanationLines = pdf.splitTextToSize(`  ${alert.explanation}`, pageWidth - 60);
        pdf.text(explanationLines, 25, yPosition);
        yPosition += explanationLines.length * 6 + 3;
      });
    }

    // Recommendations
    if (report.analysis.recommendations.length > 0) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(12);
      pdf.text('Dietary Recommendations:', 20, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      report.analysis.recommendations.forEach((rec, index) => {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.text(`${index + 1}. ${rec.title} (${rec.priority} priority)`, 20, yPosition);
        yPosition += 6;
        
        const descLines = pdf.splitTextToSize(rec.description, pageWidth - 60);
        pdf.text(descLines, 25, yPosition);
        yPosition += descLines.length * 6 + 3;
      });
    }
  }

  // Footer
  const timestamp = new Date().toLocaleString();
  pdf.setFontSize(8);
  pdf.text(`Generated on ${timestamp}`, 20, pageHeight - 10);
  pdf.text('Consult your healthcare provider before making dietary changes', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Save the PDF
  pdf.save(`blood-report-${report.date}.pdf`);
};

export const exportReportToJSON = (report: BloodReport): void => {
  const dataStr = JSON.stringify(report, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `blood-report-${report.date}.json`;
  link.click();
  URL.revokeObjectURL(url);
};
