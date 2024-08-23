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
        border-radius: 0.25rem 0 0 0;
      }
      .dp-calendar:last-child {
        margin-left: 5px;
        border: none;
        border-left: 1px solid #ccc;
        border-radius: 0 0.25rem 0 0;
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
        border-radius: 0.25rem 0.25rem 0 0 !important;
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
          <div>
            <button @click=${this.prevMonth} class="range-picker-nav-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c-12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                />
              </svg>
            </button>
          </div>
          <div>
            <!-- Month Selector -->
            <select>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>

            <!-- Year Selector -->
            <select>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
              <option value="2033">2033</option>
              <option value="2034">2034</option>
            </select>
          </div>
          <div>
            <button @click=${this.nextMonth} class="range-picker-nav-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
                />
              </svg>
            </button>
          </div>
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
    const previousMonthLastDate = new Date(
      Date.UTC(year, month0b, 0)
    ).getUTCDate();
    const firstDay = this.getFirstDayOfMonth(year, month0b);
    const daysInMonth = new Date(Date.UTC(year, month0b + 1, 0)).getUTCDate();
    const firstDayOfWeek = firstDay === 0 ? 0 : firstDay;
    let date = 1;
    let nextMonthDay = 1;
    let rows = [];
    let currentRow = [];

    for (let cellIndex = 0; cellIndex < 42; cellIndex++) {
      let day = null;
      let dataMonth = month0b + 1;
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
        day = previousMonthLastDate - firstDayOfWeek + cellIndex + 1;
        dataMonth = month0b === 0 ? 12 : month0b;
        dataYear = month0b === 0 ? year - 1 : year;
        itemClasses.push("previous-month-day");
        dayNumberSpanClasses.push("text-muted");
      } else if (date <= daysInMonth) {
        day = date++;
        const currentDate = new Date(Date.UTC(year, month0b, day));
        dayNumberSpanClasses.push("text-dark", "font-weight-bold");

        if (day === 1) {
          itemClasses.push(
            month0b === this.currentStartMonth
              ? "csm-first-day"
              : "cem-first-day"
          );
        }
        if (day === daysInMonth) {
          itemClasses.push(
            month0b === this.currentStartMonth ? "csm-last-day" : "cem-last-day"
          );
        }

        if (this.isToday(currentDate)) {
          dayNumberSpanClasses.push("current-day");
        }
        if (
          this.isDateInRange(currentDate) &&
          !itemClasses.includes("previous-month-day") &&
          !itemClasses.includes("next-month-day")
        ) {
          itemClasses.push("selected-range");
        }
        if (
          this.isStartOrEndDate(currentDate) &&
          !itemClasses.includes("previous-month-day") &&
          !itemClasses.includes("next-month-day")
        ) {
          itemClasses.push("selected-range-active");
        }
        if (this.isFocusedDate(currentDate)) {
          dayNumberSpanClasses.push("focus");
        }
      } else {
        day = nextMonthDay++;
        dataMonth = month0b === 11 ? 1 : month0b + 2;
        dataYear = month0b === 11 ? year + 1 : year;
        itemClasses.push("next-month-day");
        dayNumberSpanClasses.push("text-muted");
      }

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

      if (currentRow.length === 7) {
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
      Array.from(
        grid.querySelectorAll(
          ".calendar-grid-item:not(.previous-month-day):not(.next-month-day)"
        )
      )
    );

    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
      let index = Array.from(calendarCells).indexOf(currentFocus);

      if (index !== -1) {
        let newIndex = index;

        if (event.key === "ArrowUp") {
          newIndex = Math.max(index - 7, 0);
          this.moveFocusToNewIndex(calendarCells, newIndex);
        } else if (event.key === "ArrowDown") {
          newIndex = Math.min(index + 7, calendarCells.length - 1);
          this.moveFocusToNewIndex(calendarCells, newIndex);
        } else if (event.key === "ArrowLeft") {
          if (currentFocus.classList.contains("csm-first-day")) {
            this.prevMonth().then(() => {
              const lastDayElement = this.shadowRoot.querySelector(
                ".calendar-grid-item.csm-last-day span"
              );
              if (lastDayElement) {
                this.clearAllFocus();
                lastDayElement.classList.add("focus");
                lastDayElement.parentElement.focus();
              }
            });
          } else {
            newIndex = Math.max(index - 1, 0);
            this.moveFocusToNewIndex(calendarCells, newIndex);
          }
        } else if (event.key === "ArrowRight") {
          if (currentFocus.classList.contains("cem-last-day")) {
            this.nextMonth().then(() => {
              const firstDayElement = this.shadowRoot.querySelector(
                ".calendar-grid-item.cem-first-day span"
              );
              if (firstDayElement) {
                this.clearAllFocus();
                firstDayElement.classList.add("focus");
                firstDayElement.parentElement.focus();
              }
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
      if (
        targetCell.classList.contains("previous-month-day") ||
        targetCell.classList.contains("next-month-day")
      ) {
        return; // Skip focus if the day belongs to the previous or next month
      }

      const targetSpan = targetCell.querySelector("span");
      targetSpan.classList.add("focus");
      targetCell.focus();
      this.updateActiveDateElements();
    }
  }

  prevMonth() {
    // Decrement the month values
    this.currentStartMonth--;
    this.currentEndMonth--;

    // Handle year rollover
    if (this.currentStartMonth < 0) {
      this.currentStartMonth = 11;
      this.currentStartYear--;
    }

    if (this.currentEndMonth < 0) {
      this.currentEndMonth = 11;
      this.currentEndYear--;
    }

    // Update the focusedDate to reflect the new month
    this.focusedDate.setUTCMonth(this.currentStartMonth);
    this.focusedDate.setUTCFullYear(this.currentStartYear);

    // Return the promise from requestUpdate()
    return Promise.resolve(this.requestUpdate());
  }

  nextMonth(focusedDate) {
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

  focusOnFirstDay(monthType) {
    const calendarGrid = this.shadowRoot.querySelectorAll(
      monthType === "currentStartMonth"
        ? ".dp-calendar:first-child .calendar-grid"
        : ".dp-calendar:last-child .calendar-grid"
    );

    const firstDaySpan = calendarGrid[0].querySelector(
      '.calendar-grid-item[data-day="1"] span'
    );
    if (firstDaySpan) {
      this.clearAllFocus();
      firstDaySpan.classList.add("focus");
      firstDaySpan.parentElement.focus();
    }
  }

  focusOnLastDay(monthType) {
    const calendarGrid = this.shadowRoot.querySelectorAll(
      monthType === "currentStartMonth"
        ? ".dp-calendar:first-child .calendar-grid"
        : ".dp-calendar:last-child .calendar-grid"
    );

    const lastDay = new Date(
      this.currentStartYear,
      this.currentStartMonth + 1,
      0
    ).getDate();

    const lastDaySpan = calendarGrid[0].querySelector(
      `.calendar-grid-item[data-day="${lastDay}"] span`
    );

    if (lastDaySpan) {
      this.clearAllFocus();
      lastDaySpan.classList.add("focus");
      lastDaySpan.parentElement.focus();
    }
  }

  clearAllFocus() {
    const focusedElements = this.shadowRoot.querySelectorAll(
      ".calendar-grid-item span.focus"
    );
    focusedElements.forEach((el) => el.classList.remove("focus"));
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

    const firstDayElement = this.shadowRoot.querySelector(
      ".dp-calendar:first-child .calendar-grid-item.csm-first-day span"
    );

    if (firstDayElement) {
      firstDayElement.classList.add("focus");
      firstDayElement.parentElement.focus(); // Move focus to the parent element
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

      // Apply range classes only to dates within the range that are not in previous or next months
      if (
        this.isDateInRange(itemDate) &&
        !item.classList.contains("previous-month-day") &&
        !item.classList.contains("next-month-day")
      ) {
        item.classList.add("selected-range");
        spanElement.classList.remove("btn-outline-light");
      }

      if (
        this.isStartOrEndDate(itemDate) &&
        !item.classList.contains("previous-month-day") &&
        !item.classList.contains("next-month-day")
      ) {
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
