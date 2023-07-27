import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

const formatDate = (date: Date | undefined, customFormat?: string) => {
  if (date && isValid(date)) {
    return format(date, customFormat || "dd MMM yyyy", {
      locale: ptBR,
    });
  }
  return "";
};

export default formatDate;
