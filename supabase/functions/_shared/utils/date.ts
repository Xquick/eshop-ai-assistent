export function addDaysToDate(date: Date, days:number): Date {
    date.setDate(date.getDate() + days);

    return date;
}

export function currentSupabaseDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
}

export function isDate1AfterDate2(date1: Date, date2: Date): boolean {
    return date1.getTime() > date2.getTime();
}