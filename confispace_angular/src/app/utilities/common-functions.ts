import moment from "moment";
import { environment } from "src/environments/environment";


export class commonFunctions {
    constructor() { }

    static getStandardDate(date: Date) {
        return moment(date).format(environment.standardDate)
    }
}