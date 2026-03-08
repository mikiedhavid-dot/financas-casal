export function getMonth(date: string) {
  return date.slice(0, 7);
}

export function getMonthLabel(month: string) {
  const [year, m] = month.split("-");
  const months = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];
  return `${months[Number(m)-1]} ${year}`;
}

export function previousMonth(month: string) {
  const [y,m] = month.split("-").map(Number);
  const d = new Date(y, m-2, 1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
}

export function nextMonth(month: string) {
  const [y,m] = month.split("-").map(Number);
  const d = new Date(y, m, 1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
}