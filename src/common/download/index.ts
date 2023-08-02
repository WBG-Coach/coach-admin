import * as XLSX from "xlsx";
import formatDate from "../date";

const handleDownloadJSON = (data: any, name: string) => {
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), "Relatório");

  XLSX.writeFile(wb, `${name} - ${formatDate(new Date(), "dd-MM-yyyy")}.xlsx`);
};

export default handleDownloadJSON;
