import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Shift } from './models/constants';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dufl';

  shift = Shift;
  user: User = User.newInstance();

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month' && !moment(cellDate).isBefore(moment.now())) {
      switch (this.user.getShiftOnDate(cellDate)) {
        case Shift.A:
          return 'a-shift';
        case Shift.B:
          return 'b-shift';
        case Shift.C:
          return 'c-shift';
        default:
          return 'bg-success circle';
      }
    }

    return '';
  }


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  saveUserData() {
    this.userService.setUser(this.user);
  }

  invalidateUserForm() {
    this.user = User.newInstance();
  }

  get doesUserExists() {
    return this.userService.isUserExists();
  }

}
