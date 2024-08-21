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

      footer .small {
        font-size: 80%;
      }

      .calendar-wrapper {
        display: flex;
        border-width: 1px 1px 0;
        border-style: solid;
        border-color: #ccc;
        border-radius: 0.25rem 0.25rem 0 0;
      }

      .calendar-wrapper.focus,
      .calendar-wrapper:focus {
        outline: none !important;
        background-color: transparent !important;
        box-shadow: rgb(38 143 255 / 25%) 0px 0px 0px 0.2rem !important;
        border-radius: 0 !important;
      }

      .focus {
        outline: none;
        background-color: #e0e0e0;
        border-radius: 50%;
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
    this.focusedDate = new Date();

    if (this.currentEndMonth > 11) {
      this.currentEndMonth = 0;
      this.currentEndYear += 1;
    }
  }

  render() {
    return html`
      <div class="range-picker-wrapper">
        <div class="range-picker-nav mb-1">
          <button @click=${this.prevMonth} class="range-picker-nav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path
                d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
          </button>
          <button @click=${this.nextMonth} class="range-picker-nav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path
                d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
              />
            </svg>
          </button>
        </div>
        <div class="range-picker">
          <div class="calendar-wrapper">
            ${this.renderCalendar(
              this.currentStartMonth,
              this.currentStartYear
            )}
            ${this.renderCalendar(this.currentEndMonth, this.currentEndYear)}
          </div>
          <footer class="border-top small text-muted text-center bg-light">
            <div class="small">Use cursor keys to navigate calendar dates</div>
          </footer>
        </div>
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
        @keydown=${this.handleKeyDown}
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
    const previousMonthLastDate = new Date(
      Date.UTC(year, month0b, 0)
    ).getUTCDate();
    const firstDay = this.getFirstDayOfMonth(year, month0b);
    const daysInMonth = new Date(Date.UTC(year, month0b + 1, 0)).getUTCDate();
    const firstDayOfWeek = firstDay === 0 ? 0 : firstDay;
    let date = 1;
    let nextMonthDay = 1; // Counter for next month's days
    let rows = []; // Array to store all the weeks (rows) of the calendar
    let currentRow = []; // Store the current row (week) of the calendar

    for (let cellIndex = 0; cellIndex < 42; cellIndex++) {
      let day = null;
      let dataMonth = displayMonth;
      let dataYear = year;
      const itemClasses = ["calendar-grid-item"];
      let dayNumberSpanClasses = [
        "btn",
        "border-0",
        "rounded-circle",
        "text-nowrap",
      ];
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
        if (this.isFocusedDate(currentDate)) {
          dayNumberSpanClasses.push("focus");
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
      if (
        !itemClasses.includes("selected-range") &&
        !itemClasses.includes("selected-range-active")
      ) {
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
        ? `${dataYear}-${String(dataMonth).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`
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
            @click=${() =>
              day &&
              this.handleDayClick(
                new Date(Date.UTC(dataYear, dataMonth - 1, day))
              )}
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
        const isNextMonthRow = currentRow.every((cell) => cell.isNextMonth);
        if (!isNextMonthRow) {
          rows.push(html`${currentRow.map((c) => c.cell)}`);
        }
        currentRow = [];
      }
    }

    return html`${rows}`;
  }

  handleKeyDown(event) {
    const calendarGrids = this.shadowRoot.querySelectorAll(".calendar-grid");
    let currentFocus = this.shadowRoot.activeElement;
    let calendarCells = Array.from(calendarGrids).flatMap((grid) =>
      Array.from(grid.querySelectorAll(".calendar-grid-item"))
    );

    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
      let index = Array.from(calendarCells).indexOf(currentFocus);

      if (index !== -1) {
        let newIndex = index;

        const focusedDate = new Date(currentFocus.getAttribute("data-date"));

        if (event.key === "ArrowUp") {
          if (index < 7) {
            this.prevMonth(focusedDate).then(() => {
              this.focusOnDate(focusedDate, "currentStartMonth", -1);  // +1 for previous month
            });
          } else {
            newIndex = Math.max(index - 7, 0);
            this.moveFocusToNewIndex(calendarCells, newIndex);
          }
        } else if (event.key === "ArrowDown") {
          if (index >= calendarCells.length - 7) {
            this.nextMonth(focusedDate).then(() => {
              this.focusOnDate(focusedDate, "currentEndMonth", 1);  // +1 for next month
            });
          } else {
            newIndex = Math.min(index + 7, calendarCells.length - 1);
            this.moveFocusToNewIndex(calendarCells, newIndex);
          }
        } else if (event.key === "ArrowLeft") {
          if (index === 0) {
            this.prevMonth(focusedDate).then(() => {
              this.focusOnDate(focusedDate, "currentStartMonth", -1);  // +1 for previous month
            });
          } else {
            newIndex = Math.max(index - 1, 0);
            this.moveFocusToNewIndex(calendarCells, newIndex);
          }
        } else if (event.key === "ArrowRight") {
          if (index === calendarCells.length - 1) {
            this.nextMonth(focusedDate).then(() => {
              this.focusOnDate(focusedDate, "currentEndMonth", 1);  // +1 for next month
            });
          } else {
            newIndex = Math.min(index + 1, calendarCells.length - 1);
            this.moveFocusToNewIndex(calendarCells, newIndex);
          }
        }
      }
    } else if (event.key === "Enter" || event.key === " ") {
      this.handleEnterKeyPress(event);
    }
  }

  moveFocusToNewIndex(calendarCells, newIndex) {
    // Clear any previous focus
    this.clearAllFocus();

    const targetCell = calendarCells[newIndex];
    if (targetCell) {
      const targetSpan = targetCell.querySelector("span");
      targetSpan.classList.add("focus");
      targetCell.focus();
      this.updateActiveDateElements();
    }
  }

  prevMonth(focusedDate) {
    // Clear any previous focus
    this.clearAllFocus();

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

    this.focusedDate.setUTCMonth(this.currentStartMonth);
    this.focusedDate.setUTCFullYear(this.currentStartYear);
    return Promise.resolve(this.requestUpdate());
  }

  nextMonth(focusedDate) {
    // Clear any previous focus
    this.clearAllFocus();

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

    this.focusedDate.setUTCMonth(this.currentStartMonth);
    this.focusedDate.setUTCFullYear(this.currentStartYear);
    return Promise.resolve(this.requestUpdate());
  }

  focusOnDate(focusedDate, monthType, direction = 0) {
    // Clear any previous focus
    this.clearAllFocus();

    // Adjust the date based on the navigation direction
    const adjustedDate = new Date(focusedDate);
    const day = adjustedDate.getDate();

    if (direction === 1) {
      // Navigate to the next month
      const lastDayOfMonth = new Date(adjustedDate.getFullYear(), adjustedDate.getMonth() + 1, 0).getDate();
      adjustedDate.setDate(day === lastDayOfMonth ? 1 : day);
    } else if (direction === -1) {
      // Navigate to the previous month
      adjustedDate.setDate(day === 1 ? new Date(adjustedDate.getFullYear(), adjustedDate.getMonth(), 0).getDate() : day);
    }

    const calendarGrid = this.shadowRoot.querySelectorAll(
      monthType === "currentStartMonth"
        ? ".dp-calendar:first-child .calendar-grid"
        : ".dp-calendar:last-child .calendar-grid"
    );

    const targetSpan = calendarGrid[0].querySelector(
      `[data-date="${adjustedDate.toISOString().split("T")[0]}"] span`
    );

    if (targetSpan) {
      targetSpan.classList.add("focus");
      targetSpan.parentElement.focus(); // Move focus to the parent element
    } else {
      // If the same date doesn't exist in the new month, focus on the last day of the month
      const lastDaySpan = calendarGrid[0].querySelector(
        `[data-date="${new Date(adjustedDate.getFullYear(), adjustedDate.getMonth() + 1, 0).toISOString().split("T")[0]}"] span`
      );
      if (lastDaySpan) {
        lastDaySpan.classList.add("focus");
        lastDaySpan.parentElement.focus();
      }
    }
  }

  clearAllFocus() {
    const focusedElements = this.shadowRoot.querySelectorAll(
      ".calendar-grid-item span.focus"
    );
    focusedElements.forEach((el) => el.classList.remove("focus"));
  }

  focusOnFirstOrLastDay(dayClass, monthType) {
    const calendarGrid = this.shadowRoot.querySelectorAll(
      monthType === "currentStartMonth"
        ? ".dp-calendar:first-child .calendar-grid"
        : ".dp-calendar:last-child .calendar-grid"
    );
    const daySpan = calendarGrid[0].querySelector(`.${dayClass}`);

    if (daySpan) {
      this.clearAllFocus();
      daySpan.classList.add("focus");
      daySpan.parentElement.focus(); // Move focus to the parent element
    }
  }

  handleDayClick(date) {
    this.selectDate(date);
  }

  handleEnterKeyPress(event) {
    const focusedElement = this.shadowRoot.querySelector(
      ".calendar-grid-item span.focus"
    );
    if (focusedElement) {
      const date = new Date(
        focusedElement.parentElement.getAttribute("data-date")
      );
      this.selectDate(date);
    }
  }

  handleCalendarFocus() {
    this.clearAllFocus();

    const firstCalendarGridItem = this.shadowRoot.querySelector(
      ".calendar-grid-item span"
    );
    if (firstCalendarGridItem) {
      firstCalendarGridItem.classList.add("focus");
      firstCalendarGridItem.parentElement.focus(); // Move focus to the parent element
      this.shadowRoot.querySelector(".calendar-wrapper").classList.add("focus");
    }
  }

  handleCalendarFocusOut(event) {
    const calendarDiv = this.shadowRoot.querySelector(".calendar-wrapper");
    // If the newly focused element is not within the calendar, remove all focus classes
    if (
      !this.shadowRoot
        .querySelector(".calendar-wrapper")
        .contains(event.relatedTarget)
    ) {
      this.clearAllFocus();
      calendarDiv.classList.remove("focus");
    }
  }

  selectDate(date) {
    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null;
    } else {
      if (date >= this.startDate) {
        this.endDate = date;
      } else {
        // Handle case where user selects an end date earlier than the start date
        this.startDate = date;
        this.endDate = null;
      }
    }

    this.updateSelectedRange();
    this.requestUpdate();
  }

  updateSelectedRange() {
    const allItems = this.shadowRoot.querySelectorAll(".calendar-grid-item");

    allItems.forEach((item) => {
      const itemDate = new Date(item.getAttribute("data-date"));
      const spanElement = item.querySelector("span");

      // Clear previous range classes
      item.classList.remove("selected-range", "selected-range-active");
      spanElement.classList.remove("focus");

      if (this.isDateInRange(itemDate)) {
        item.classList.add("selected-range");
        spanElement.classList.remove("btn-outline-light");
      }

      if (this.isStartOrEndDate(itemDate)) {
        item.classList.add("selected-range-active");
        spanElement.classList.remove("btn-outline-light");
      }
    });
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
    // Ensuring the date is within the range, inclusive of start and end dates
    return (
      this.startDate &&
      this.endDate &&
      date >= this.startDate &&
      date <= this.endDate
    );
  }

  isStartOrEndDate(date) {
    // Check if the date is either the start date or the end date
    return (
      (this.startDate && date.getTime() === this.startDate.getTime()) ||
      (this.endDate && date.getTime() === this.endDate.getTime())
    );
  }

  isFocusedDate(date) {
    return this.focusedDate && date.getTime() === this.focusedDate.getTime();
  }

  updateActiveDateElements() {
    const focusedSpan = this.shadowRoot.querySelector(
      ".calendar-grid-item span.focus"
    );

    if (focusedSpan) {
      const dataDate = focusedSpan.parentElement.getAttribute("data-date");
      const date = new Date(`${dataDate}T00:00:00Z`);

      const selectedDateYmd =
        this.shadowRoot.querySelector(".selected-date-Ymd");
      const selectedFormatted = this.shadowRoot.querySelector(
        ".selected-formatted-date"
      );
      const selectedIsoFormatted = this.shadowRoot.querySelector(
        ".selected-formatted-iso"
      );

      if (selectedDateYmd) {
        selectedDateYmd.textContent = this.formatDateYmd(date);
      }
      if (selectedFormatted) {
        selectedFormatted.textContent = this.formatDateLong(date);
      }
      if (selectedIsoFormatted) {
        selectedIsoFormatted.textContent = this.formatISODate(date);
      }
    }
  }

  getFirstDayOfMonth(year, month) {
    return new Date(Date.UTC(year, month, 1)).getUTCDay();
  }

  formatDateYmd(date) {
    return date.toISOString().split("T")[0];
  }

  formatDateLong(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    return date.toLocaleDateString("en-US", options);
  }

  formatISODate(date) {
    return date.toISOString();
  }
}

customElements.define("date-range-picker", DateRangePicker);
