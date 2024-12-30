import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  selectDay(_t37: number | null) {
    throw new Error('Method not implemented.');
  }

  daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  calendar: (number | null)[][] = [];
  currentDate = new Date();
  month = this.currentDate.getMonth();

  ngOnInit() {
    this.generateCalendar(this.currentDate.getFullYear(), this.month);
  }

  generateCalendar(year: number, month: number) {
    console.log('month: ', month);

    this.calendar = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let day = 1;
    for (let i = 0; i < 6; i++) { //maximo de semanas em um mês
      const week: (number | null)[] = [];
      for (let j = 0; j < 7; j++) { //maximo de dias em uma semanas
        if (i === 0 && j < firstDayOfMonth) {
          week.push(null);
        } else if (day <= daysInMonth) {
          week.push(day);
          day++;
        } else {
          week.push(null);
        }
      }
      this.calendar.push(week);
      if (day > daysInMonth) break; // Otimização: interrompe o loop se o mês acabar
    }
  }

  goToPreviousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth()
    );
  }

  goToNextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth()
    );
  }
}
