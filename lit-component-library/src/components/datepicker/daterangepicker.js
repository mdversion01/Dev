import { LitElement, html, css } from "lit";
import Fontawesome from "lit-fontawesome";
import { datepickerStyles } from "./datepicker-styles.js";
import { utilitiesStyles } from "../utilities-styles.js";

class DateRangePicker extends LitElement {
  static styles = [
    Fontawesome,
    utilitiesStyles,
    datepickerStyles,
    css`
      .dp-calendar:first-child {
        margin-right: 5px;
        border: none;
        border-right: 1px solid #ccc;
        border-radius: 0;
      }
      .dp-calendar:last-child {
        margin-left: 5px;
        border: none;
        border-left: 1px solid #ccc;
        border-radius: 0;
      }

      .border-top {
        border-top: 1px solid #ccc !important;
      }

      footer {
        border-width: 0 1px 1px 1px;
        border-style: solid;
        border-color: #ccc;
        border-radius: 0 0 0.25rem 0.25rem;
      }

      .date-range-picker {
        display: inline-block;
      }
      .calendar-wrapper {
        display: flex;
        border-width: 1px 1px 0;
        border-style: solid;
        border-color: #ccc;
        border-radius: 0.25rem 0.25rem 0 0;
      }
      .selected-range {
        background-color: rgba(0, 123, 255, 0.25); /* Light blue background for selected range */
        border-radius: 0 !important;
      }

      .selected-range-active {
        color: rgb(255, 255, 255) !important;
        background-color: rgb(0, 98, 204);
      }

      .selected-range-active .btn {
        color: rgb(255, 255, 255) !important;
      }

      .empty-cell {
        visibility: hidden;
      }
    `,
  ];

  constructor() {
    super();
    this.startDate = null;
    this.endDate = null;
    this.currentStartMonth = new Date().getMonth(); // Default to the current month
    this.currentStartYear = new Date().getFullYear();
    this.currentEndMonth = this.currentStartMonth + 1; // Default to the next month
    this.currentEndYear = this.currentStartYear;

    if (this.currentEndMonth > 11) {
      this.currentEndMonth = 0;
      this.currentEndYear += 1;
    }
  }

  render() {
    return html`
      <div class="calendar-nav mb-2">
        <button @click=${this.prevMonth}>Previous</button>
        <button @click=${this.nextMonth}>Next</button>
      </div>
      <div class="date-range-picker">
        <div class="calendar-wrapper">
          ${this.renderCalendar(this.currentStartMonth, this.currentStartYear)}
          ${this.renderCalendar(this.currentEndMonth, this.currentEndYear)}
        </div>
        <footer class="border-top small text-muted text-center bg-light">
          <div class="small">Use cursor keys to navigate calendar dates</div>
        </footer>
      </div>
    `;
  }

  renderCalendar(month0b, year) {
    const displayMonth = month0b + 1;
    const calendarGridId = `calendar-grid-${month0b}-${year}`;
    const formattedMonthYear = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(new Date(year, month0b, 1));

    return html`
      <div
        aria-describedby="${calendarGridId}"
        aria-labelledby="calendar-grid-caption"
        aria-roledescription="Calendar"
        class="calendar dp-calendar form-control h-auto text-center pt-2"
        role="region"
        aria-label="Calendar"
        tabindex="0"
        @focus=${this.handleCalendarFocus}
        @focusout=${this.handleCalendarFocusOut}
      >
        <div
          aria-live="polite"
          aria-atomic="true"
          class="calendar-grid-caption text-center font-weight-bold"
          id="calendar-grid-caption"
        >
          ${formattedMonthYear}
        </div>
        <div aria-hidden="true" class="calendar-grid-weekdays">
          <small
            aria-label="Sunday"
            title="Sunday"
            class="calendar-grid-day col"
            >Sun</small
          >
          <small
            aria-label="Monday"
            title="Monday"
            class="calendar-grid-day col"
            >Mon</small
          >
          <small
            aria-label="Tuesday"
            title="Tuesday"
            class="calendar-grid-day col"
            >Tue</small
          >
          <small
            aria-label="Wednesday"
            title="Wednesday"
            class="calendar-grid-day col"
            >Wed</small
          >
          <small
            aria-label="Thursday"
            title="Thursday"
            class="calendar-grid-day col"
            >Thu</small
          >
          <small
            aria-label="Friday"
            title="Friday"
            class="calendar-grid-day col"
            >Fri</small
          >
          <small
            aria-label="Saturday"
            title="Saturday"
            class="calendar-grid-day col"
            >Sat</small
          >
        </div>
        <div class="calendar-grid" id="${calendarGridId}">
          ${this.renderCalendarDays(month0b, year)}
        </div>
      </div>
    `;
  }

  renderCalendarDays(month0b, year) {
    const displayMonth = month0b + 1;
    const previousMonthLastDate = new Date(Date.UTC(year, month0b, 0)).getUTCDate();
    const firstDay = this.getFirstDayOfMonth(year, month0b);
    const daysInMonth = new Date(Date.UTC(year, month0b + 1, 0)).getUTCDate();
    const firstDayOfWeek = firstDay === 0 ? 0 : firstDay;
    let date = 1;
    let nextMonthDay = 1; // Counter for next month's days
    let rows = []; // Array to store all the weeks (rows) of the calendar
    let currentRow = []; // Store the current row (week) of the calendar

    // Iterate through the calendar cells
    for (let cellIndex = 0; cellIndex < 42; cellIndex++) {
      let day = null;
      let dataMonth = displayMonth;
      let dataYear = year;
      const itemClasses = ["calendar-grid-item"];
      let dayNumberSpanClasses = ["btn", "border-0", "rounded-circle", "text-nowrap"];
      let ariaLabel = "";

      if (cellIndex < firstDayOfWeek) {
        // Previous month days
        day = previousMonthLastDate - firstDayOfWeek + cellIndex + 1;
        dataMonth = month0b === 0 ? 12 : month0b;
        dataYear = month0b === 0 ? year - 1 : year;
        itemClasses.push("previous-month-day");
        dayNumberSpanClasses.push("text-muted");
      } else if (date <= daysInMonth) {
        // Current month days
        day = date++;
        const currentDate = new Date(Date.UTC(year, month0b, day));
        dayNumberSpanClasses.push("text-dark", "font-weight-bold");
        if (this.isToday(currentDate)) {
          dayNumberSpanClasses.push("current-day");
        }
        if (this.isDateInRange(currentDate)) {
          itemClasses.push("selected-range");
        }
        if (this.isStartOrEndDate(currentDate)) {
          itemClasses.push("selected-range-active");
        }
      } else {
        // Next month days
        day = nextMonthDay++;
        dataMonth = month0b === 11 ? 1 : month0b + 2;
        dataYear = month0b === 11 ? year + 1 : year;
        itemClasses.push("next-month-day");
        dayNumberSpanClasses.push("text-muted");
      }

      // Remove btn-outline-light if the grid item has selected-range or selected-range-active
      if (!itemClasses.includes("selected-range") && !itemClasses.includes("selected-range-active")) {
        dayNumberSpanClasses.push("btn-outline-light");
      }

      ariaLabel = day
        ? new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(dataYear, dataMonth - 1, day))
        : "";

      const dataDate = day
        ? `${dataYear}-${String(dataMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`
        : "";

      const calendarCell = {
        cell: html`
          <div
            class="${itemClasses.join(" ")}"
            role="button"
            tabindex="-1"
            data-month="${dataMonth}"
            data-year="${dataYear}"
            data-day="${day}"
            data-date="${dataDate}"
            id="${day ? `cell-${dataDate}` : ""}"
            aria-label="${ariaLabel}"
            @click=${() => day && this.handleDayClick(new Date(Date.UTC(dataYear, dataMonth - 1, day)))}
          >
            <span class="${dayNumberSpanClasses.join(" ")}">${day || ""}</span>
          </div>
        `,
        isNextMonth: itemClasses.includes("next-month-day"),
      };

      currentRow.push(calendarCell);

      // Every 7 cells, we've completed a row (week)
      if (currentRow.length === 7) {
        // Check if the row contains only next-month-day cells
        const isNextMonthRow = currentRow.every(cell => cell.isNextMonth);
        if (!isNextMonthRow) {
          rows.push(html`${currentRow.map(c => c.cell)}`);
        }
        currentRow = [];
      }
    }

    return html`${rows}`;
  }

  prevMonth() {
    this.currentStartMonth--;
    this.currentEndMonth--;

    if (this.currentStartMonth < 0) {
      this.currentStartMonth = 11;
      this.currentStartYear--;
    }

    if (this.currentEndMonth < 0) {
      this.currentEndMonth = 11;
      this.currentEndYear--;
    }

    this.requestUpdate();
  }

  nextMonth() {
    this.currentStartMonth++;
    this.currentEndMonth++;

    if (this.currentStartMonth > 11) {
      this.currentStartMonth = 0;
      this.currentStartYear++;
    }

    if (this.currentEndMonth > 11) {
      this.currentEndMonth = 0;
      this.currentEndYear++;
    }

    this.requestUpdate();
  }

  handleDayClick(date) {
    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null; // Clear end date if it's already selected
    } else {
      if (date >= this.startDate) {
        this.endDate = date;
      }
    }
    this.requestUpdate();
  }

  isToday(date) {
    const today = new Date();
    return (
      date.getUTCFullYear() === today.getUTCFullYear() &&
      date.getUTCMonth() === today.getUTCMonth() &&
      date.getUTCDate() === today.getUTCDate()
    );
  }

  isDateInRange(date) {
    return (
      this.startDate &&
      this.endDate &&
      date >= this.startDate &&
      date <= this.endDate
    );
  }

  isStartOrEndDate(date) {
    return (
      (this.startDate && date.getTime() === this.startDate.getTime()) ||
      (this.endDate && date.getTime() === this.endDate.getTime())
    );
  }

  handleCalendarFocus() {
    // Handle calendar focus event if necessary
  }

  handleCalendarFocusOut() {
    // Handle calendar focus out event if necessary
  }

  getFirstDayOfMonth(year, month) {
    return new Date(Date.UTC(year, month, 1)).getUTCDay();
  }
}

customElements.define("date-range-picker", DateRangePicker);
