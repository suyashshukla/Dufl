import { WeekDay } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Shift } from './models/constants';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        UserService
      ]
    }).compileComponents();
  });

  it('Shift Tests (Saturday Shuffle)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const user = new User({
      name: 'Suyash Shukla',
      dateOfRegistration: new Date(2021, 7, 29),
      shiftOnRegistrationDate: Shift.B
    });


    expect(user.getShiftOnDate(new Date(2021, 8, 5))).toEqual(Shift.C);
    expect(user.getShiftOnDate(new Date(2021, 8, 18))).toEqual(Shift.B);
    expect(user.getShiftOnDate(new Date(2021, 8, 11))).toEqual(Shift.A);
    expect(user.getShiftOnDate(new Date(2021, 8, 3))).toEqual(Shift.A);
  });

  it('Shift Tests (Wednesday Shuffle)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const user = new User({
      name: 'Suyash Shukla',
      dateOfRegistration: new Date(2021, 5, 9),
      shiftOnRegistrationDate: Shift.A
    });


    expect(user.getShiftOnDate(new Date(2021, 6, 1))).toEqual(Shift.A);
    expect(user.getShiftOnDate(new Date(2021, 6, 8))).toEqual(Shift.B);
    expect(user.getShiftOnDate(new Date(2021, 6, 11))).toEqual(Shift.A);
    expect(user.getShiftOnDate(new Date(2021, 6, 25))).toEqual(Shift.C);
  });


  it('Shift Tests (Sequential)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const user = new User({
      name: 'Suyash Shukla',
      dateOfRegistration: new Date(2021, 7, 29),
      shiftOnRegistrationDate: Shift.B
    });

    expect(user.getShiftOnDate(new Date(2021, 8, 1))).toEqual(Shift.A);
    expect(user.getShiftOnDate(new Date(2021, 8, 4))).toEqual(Shift.C);
    expect(user.getShiftOnDate(new Date(2021, 8, 8))).toEqual(Shift.B);
    expect(user.getShiftOnDate(new Date(2021, 8, 11))).toEqual(Shift.A);
  });

  // it(`Different Shifts`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('dufl');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('dufl app is running!');
  // });

});

