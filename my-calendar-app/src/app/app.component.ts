import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meetings';
  
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Today\'s Meeting',
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
      }
    },
    {
      start: new Date(2025, 5, 15, 10, 0), // June 15, 2025, 10:00 AM
      end: new Date(2025, 5, 15, 12, 0),   // June 15, 2025, 12:00 PM
      title: 'Project Review',
      color: {
        primary: '#1e90ff',
        secondary: '#D1E7DD'
      }
    },
    {
      start: new Date(2025, 5, 20, 14, 30), // June 20, 2025, 2:30 PM
      end: new Date(2025, 5, 20, 16, 0),    // June 20, 2025, 4:00 PM
      title: 'Team Standup',
      color: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
      }
    },
    {
      start: new Date(2024, 11, 25, 9, 0),   // December 25, 2024, 9:00 AM
      title: 'Holiday Event',
      color: {
        primary: '#28a745',
        secondary: '#D4EDDA'
      },
      allDay: true
    }
  ];
  

  setView(view: string) {
    switch (view) {
      case 'month':
        this.view = CalendarView.Month;
        break;
      case 'week':
        this.view = CalendarView.Week;
        break;
      case 'day':
        this.view = CalendarView.Day;
        break;
      default:
        this.view = CalendarView.Month;
    }
  }

  // Method to navigate to previous period
  previousPeriod(): void {
    if(this.view===CalendarView.Month)
    {
      const previousMonth = new Date(this.viewDate);
      previousMonth.setMonth(previousMonth.getMonth() - 1);
      this.viewDate = previousMonth;
    }
    else if(this.view === CalendarView.Week)
    {
      const previousWeek = new Date(this.viewDate);
      previousWeek.setDate(previousWeek.getDate() - 7);
      this.viewDate = previousWeek;
    }
    else
    {
      const previousDay = new Date(this.viewDate);
      previousDay.setDate(previousDay.getDate() - 1);
      this.viewDate = previousDay;
    }
  }

  // Method to navigate to next period
  nextPeriod(): void {
    if(this.view===CalendarView.Month)
    {
      const previousMonth = new Date(this.viewDate);
      previousMonth.setMonth(previousMonth.getMonth() + 1);
      this.viewDate = previousMonth;
    }
    else if(this.view === CalendarView.Week)
    {
      const previousWeek = new Date(this.viewDate);
      previousWeek.setDate(previousWeek.getDate() + 7);
      this.viewDate = previousWeek;
    }
    else if(this.view === CalendarView.Day)
    {
      const previousDay = new Date(this.viewDate);
      previousDay.setDate(previousDay.getDate() + 1);
      this.viewDate = previousDay;
    }
  }

  // Method to go to today
  today(): void {
    this.viewDate = new Date();
  }

  // Get current month name and year for header
  get currentPeriodDisplay(): string {
    if(this.view === CalendarView.Month)
    {
      return this.viewDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    }
    else if(this.view === CalendarView.Week)
    {
      const weekStart = startOfWeek(this.viewDate);
      const weekEnd = endOfWeek(this.viewDate);
      return `${weekStart.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })} - ${weekEnd.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })}`;
    }
    else if(this.view === CalendarView.Day)
    {
      return this.viewDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric' 
      });
    }
  }

  get calendarViewType(): string {
    switch(this.view)
    {
      case CalendarView.Month:
        return 'Month';
      case CalendarView.Week:
        return 'Week';
      case CalendarView.Day:
        return 'Day';
      default:
        return 'Month';
    }
  }

  isViewActive(view: string): boolean {
    switch (view) {
      case 'month':
        return this.view === CalendarView.Month;
      case 'week':
        return this.view === CalendarView.Week;
      case 'day':
        return this.view === CalendarView.Day;
      default:
        return false;
    }
  }
}
