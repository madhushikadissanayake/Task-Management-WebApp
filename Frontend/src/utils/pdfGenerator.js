import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

export const generateTasksPDF = (tasks, filename = 'tasks-report.pdf') => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Task Management Report', 20, 20);
  
  // Add generation date
  doc.setFontSize(12);
  doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 20, 35);
  
  // Prepare data for table
  const tableData = tasks.map(task => [
    task.title,
    task.assignedTo,
    task.status,
    task.priority || 'Medium',
    format(new Date(task.deadline), 'MMM dd, yyyy'),
    format(new Date(task.createdAt), 'MMM dd, yyyy')
  ]);
  
  // Add table
  doc.autoTable({
    head: [['Title', 'Assigned To', 'Status', 'Priority', 'Deadline', 'Created']],
    body: tableData,
    startY: 45,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251],
    },
  });
  
  // Add summary
  const finalY = doc.lastAutoTable.finalY + 20;
  doc.setFontSize(14);
  doc.text('Summary:', 20, finalY);
  
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});
  
  doc.setFontSize(12);
  let summaryY = finalY + 10;
  doc.text(`Total Tasks: ${tasks.length}`, 20, summaryY);
  
  Object.entries(statusCounts).forEach(([status, count]) => {
    summaryY += 7;
    doc.text(`${status}: ${count}`, 20, summaryY);
  });
  
  // Save the PDF
  doc.save(filename);
};
