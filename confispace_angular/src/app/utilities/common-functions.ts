import moment from "moment";
import { environment } from "src/environments/environment";
import { timeRange } from './../components/day-schedules/day-schedules.component';

export class commonFunctions {    

    static weekDays = [
        { day: 1, label: 'Lunes' },
        { day: 2, label: 'Martes' },
        { day: 3, label: 'Miércoles' },
        { day: 4, label: 'Jueves' },
        { day: 5, label: 'Viernes' },
        { day: 6, label: 'Sábado' },
        { day: 7, label: 'Domingo' },
    ]

    static getStandardDate(date: Date) {
        return moment(date).format(environment.standardDate)
    }

    static getTime(time: string, format: string = "hh:mm") {
        return moment(time, "HH:mm:ss").format(format);
    }

    static currentDay() {
        return moment().format(environment.standardDate)
    }

    static currentTime() {
        return moment().format('h:mm:ss')
    }

    static validTimeRange(start, end): boolean {
        const start_time = moment(start, "HH:mm:ss")
        const end_time = moment(end, "HH:mm:ss")
        if (!start_time.isValid() || !end_time.isValid() || end_time.isBefore(start_time) || end_time.isSame(start_time)) {
            return false;
        }
        return true
    }

    static overlapTimeRanges(ranges: timeRange[]): boolean {
        let timeSegments = Object.assign([], ranges);
        if (!timeSegments?.length || timeSegments?.length === 1) return false;

        timeSegments.sort((timeSegment1, timeSegment2) => {
            return timeSegment1.start_time.localeCompare(timeSegment2.start_time)
        });

        for (let i = 0; i < timeSegments.length - 1; i++) {
            const currentEndTime = timeSegments[i].end_time;
            const nextStartTime = timeSegments[i + 1].start_time;

            if (currentEndTime > nextStartTime) {
                return true;
            }
        }

        return false;
    }

    static deepCopy = (inObject) => {
        let outObject, value, key;
        if (typeof inObject !== "object" || inObject === null) {
            return inObject // Return the value if inObject is not an object
        }
        // Create an array or object to hold the values
        outObject = Array.isArray(inObject) ? [] : {}
        for (key in inObject) {
            value = inObject[key]
            // Recursively (deep) copy for nested objects, including arrays
            outObject[key] = commonFunctions.deepCopy(value)
        }
        return outObject
    }
}