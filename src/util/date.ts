import {useI18n} from "vue-i18n";

export function isDate1AfterDate2(date1: Date, date2: Date): boolean {
    return date1.getTime() > date2.getTime();
}


export function dateDiffInDays(date1: Date, date2:Date): number {
    var Difference_In_Time = date2.getTime() - date1.getTime();

    return Difference_In_Time / (1000 * 3600 * 24);
}

export function addDaysToDate(date: Date, days:number): Date {
    date.setDate(date.getDate() + days);

    return date;
}

export function dateInflections(dayCount) {
    const { t } = useI18n();

    if (dayCount === 0) return t('general.day0');
    if (dayCount === 1) return t('general.day1');
    if (dayCount >=2 && dayCount <=4) return t('general.day2-4');

    return t('general.day5+');
}

export enum DateFormatType {
    DATE,
    LONG
}
export function formatDate(dateInput, formatType: DateFormatType = DateFormatType.LONG) {
    let dateTimeOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }

    if (formatType === DateFormatType.DATE) {
        dateTimeOptions = {
            month: "long",
            day: "numeric",
        };
    }

    return new Date(dateInput).toLocaleDateString('cs', dateTimeOptions);
}
