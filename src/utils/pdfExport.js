import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadDashboardPDF = async (elementId = "dashboard-report") => {
  const input = document.getElementById(elementId);
  if (!input) throw new Error("Dashboard content not found");

  const canvas = await html2canvas(input, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, width, height);
  pdf.save("framekit-dashboard.pdf");
};
