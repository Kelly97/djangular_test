import moment from "moment";
import { environment } from "src/environments/environment";


export class commonFunctions {
    constructor() { }

    static getStandardDate(date: Date) {
        return moment(date).format(environment.standardDate)
    }

    static getTime(time: string, format:string = "hh:mm"){
        return moment(time, "HH:mm:ss").format(format);
    }

    static currentDay(){
        return moment().format(environment.standardDate)
    }

    static currentTime(){
        return moment().format('h:mm:ss')
    }

    static filterItems(value: string, items: any[], keys: string[]) {
        const filterValue = value.toLowerCase();
        return items.filter(item => {
            let string = "";
            keys.forEach(key => {
                string = item[key].toLowerCase();
            });
            return string.toLowerCase().includes(filterValue);
        });
    }
}