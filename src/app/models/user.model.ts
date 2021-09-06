import { query } from "@angular/animations";
import { WeekDay } from "@angular/common";
import * as moment from "moment";
import { FirstHalfDays, Shift } from "./constants";

export class User {
    public name: string;
    public dateOfRegistration: Date;
    public shiftOnRegistrationDate: Shift;

    constructor(args: any) {
        this.name = args.name;
        this.dateOfRegistration = args.dateOfRegistration ? new Date(args.dateOfRegistration) : new Date();
        this.shiftOnRegistrationDate = +args.shiftOnRegistrationDate;
    }

    static newInstance() {
        return new User({});
    }

    getShiftOnDate(queryDate: Date) {
        queryDate = new Date(queryDate.toDateString());
        let shuffleDate = new Date(this.registeredShiftStartDate.toDateString());
        let finalShift = this.shiftOnRegistrationDate;
        console.log(moment(queryDate).diff(shuffleDate, 'days'));
        while (moment(queryDate).diff(shuffleDate, 'days') >= 7) {
            shuffleDate = moment(shuffleDate).add(7, 'days').toDate();

            // Since shift shuffles twice every week
            finalShift = this.getNextShift(finalShift);
            finalShift = this.getNextShift(finalShift);

        }

        if (+this.isInFirstHalfDays(shuffleDate) ^ +this.isInFirstHalfDays(queryDate)) {
            shuffleDate = moment(shuffleDate).add(this.isInFirstHalfDays(shuffleDate) ? 4 : 3, 'days').toDate();
            return this.getNextShift(finalShift);
        }

        return finalShift;
    }


    private get todaysShift() {
        return this.getShiftOnDate(new Date());
    }

    private get registeredShiftStartDate() {
        let shiftStartDate = new Date(this.dateOfRegistration);
        if (this.isInFirstHalfDays(this.dateOfRegistration)) {
            this.getShiftStartDate(shiftStartDate, WeekDay.Saturday);
        }
        else {
            this.getShiftStartDate(shiftStartDate, WeekDay.Wednesday);
        }

        return shiftStartDate;
    }

    private getShiftStartDate(date: Date, shuffleDay: WeekDay) {
        while (date.getDay() !== shuffleDay) {
            date.setDate(date.getDate() - 1);
        }
    }

    private isInFirstHalfDays(queryDate: Date) {
        return FirstHalfDays.includes(queryDate.getDay())
    }

    private getNextShift(currentShift: Shift) {
        switch (currentShift) {
            case Shift.A:
                return Shift.C;
            case Shift.B:
                return Shift.A;
            case Shift.C:
                return Shift.B;
        }
    }
}