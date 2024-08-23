import { LitElement, html, css } from "lit";
import Fontawesome from "lit-fontawesome";
import { datepickerStyles } from "./datepicker-styles.js";

class DatePicker extends LitElement {
  static styles = [
    Fontawesome,
    datepickerStyles,
    css`
      footer .small {
        font-size: 80%;
      }
    `,
  ];

  constructor() {
    super();
    this.selectedDate = null;
    this.selectedMonth = null;
    this.selectedYear = null;
    this.previousSelectedDayElement = null;
    this.currentSelectedDate = new Date();
    this.shouldClearSelectedDate = false;
    this.isCalendarFocused = false;
    this.currentMonth = this.currentSelectedDate.getMonth();
    this.currentYear = this.currentSelectedDate.getFullYear();
  }

  firstUpdated() {
    this.renderCalendar(this.currentMonth, this.currentYear);
    this.updateSelectedDateDisplay("No date selected");
    this.updateInitialContext();
  }

  render() {
    return html`
      <div class="dp-calendar">
        <div
          class="calendar-inner"
          dir="ltr"
          lang="en-US"
          role="group"
          aria-describedby="calendar-wrapper"
        ></div>
        <header class="datepicker" title="Selected Date">
          <output
            aria-live="polite"
            aria-atomic="true"
            class="selected-date form-control form-control-sm text-center"
            id="selected-date"
            role="status"
            tabindex="-1"
          >
            <bdi>No date selected</bdi>
            <bdi class="sr-only">(Selected date)</bdi>
          </output>
        </header>
        <div
          class="calendar-nav d-flex"
          aria-label="Calendar Navigation"
          role="group"
          aria-labelledby="calendar-navigation"
        >
          <span id="calendar-navigation" class="sr-only"
            >Calendar Navigation</span
          >
          <button
            aria-label="Previous year"
            aria-keyshortcuts="Alt+PageDown"
            class="prev-year btn btn-sm border-0 flex-fill btn-outline-secondary"
            title="Previous year"
            type="button"
            @click=${this.prevYear}
          >
            <i class="fas fa-angle-double-left" aria-hidden="true"></i>
          </button>
          <button
            aria-label="Previous month"
            aria-keyshortcuts="PageDown"
            class="prev-month btn btn-sm border-0 flex-fill btn-outline-secondary"
            title="Previous month"
            type="button"
            @click=${this.prevMonth}
          >
            <i class="fas fa-angle-left" aria-hidden="true"></i>
          </button>
          <button
            aria-label="Current Day/Month/Year"
            aria-keyshortcuts="Home"
            class="current-date btn btn-sm border-0 flex-fill btn-outline-secondary"
            title="Current Day/Month/Year"
            type="button"
            @click=${this.currentDate}
          >
            <i class="fas fa-circle" aria-hidden="true"></i>
            <span class="sr-only">Today</span>
          </button>
          <button
            aria-label="Next month"
            aria-keyshortcuts="PageUp"
            class="next-month btn btn-sm border-0 flex-fill btn-outline-secondary"
            title="Next month"
            type="button"
            @click=${this.nextMonth}
          >
            <i class="fas fa-angle-right" aria-hidden="true"></i>
          </button>
          <button
            title="Next year"
            type="button"
            class="next-year btn btn-sm border-0 flex-fill btn-outline-secondary"
            aria-label="Next year"
            aria-keyshortcuts="Alt+PageUp"
            @click=${this.nextYear}
          >
            <i class="fas fa-angle-double-right" aria-hidden="true"></i>
          </button>
        </div>
        <div
          aria-describedby="calendar-grid"
          aria-labelledby="calendar-grid-caption"
          aria-roledescription="Calendar"
          class="calendar form-control h-auto text-center pt-2"
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
            id="__CDID__calendar-grid-caption_"
          ></div>
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
          <div class="calendar-grid" id="calendar-grid"></div>
          <footer class="border-top small text-muted text-center bg-light">
            <div class="small">Use cursor keys to navigate calendar dates</div>
          </footer>
        </div>
      </div>

      <div class="context" role="region" aria-labelledby="context-title">
        <div id="context-title">Context:</div>
        <div>
          selectedYMD: "<span class="selected-date-Ymd">Date not selected</span
          >"
        </div>
        <div>
          selectedFormatted: "<span class="selected-formatted-date"
            >Date not selected</span
          >"
        </div>
        <div>
          selectedIsoFormatted: "<span class="selected-formatted-iso"
            >Date not selected</span
          >"
        </div>
        <div>activeYMD: "<span class="active-date-ymd"></span>"</div>
        <div>
          activeFormatted: "<span class="active-formatted-date-long"></span>"
        </div>
        <div>
          activeIsoFormatted: "<span class="active-formatted-iso"></span>"
        </div>
      </div>
    `;
  }

  handleCalendarFocus() {
    const firstCalendarGridItem = this.shadowRoot.querySelector(
      ".calendar-grid-item span"
    );
    if (firstCalendarGridItem) {
      firstCalendarGridItem.classList.add("focus");
      firstCalendarGridItem.parentElement.focus(); // Move focus to the parent element
      this.shadowRoot.querySelector(".calendar").classList.add("focus");
    }
  }

  handleCalendarFocusOut(event) {
    const calendarDiv = this.shadowRoot.querySelector(".calendar");
    // If the newly focused element is not within the calendar, remove all focus classes
    if (
      !this.shadowRoot.querySelector(".calendar").contains(event.relatedTarget)
    ) {
      const allFocusedItems = this.shadowRoot.querySelectorAll(
        ".calendar-grid-item span.focus"
      );
      allFocusedItems.forEach((span) => {
        span.classList.remove("focus");
        calendarDiv.classList.remove("focus");
      });
    }
  }

  getFirstDayOfMonth(year, month) {
    return new Date(Date.UTC(year, month, 1)).getUTCDay();
  }

  formatDate(year, month, day) {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    };
    const selectedDate = new Date(Date.UTC(year, month - 1, day));
    return selectedDate.toLocaleDateString(undefined, options);
  }

  formatDateForAriaLabel(date, isCurrentDay = false) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    if (isNaN(date)) {
      console.error("Invalid date provided to formatDateForAriaLabel");
      return "Invalid Date";
    }

    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    };
    const formattedDate = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    ).toLocaleDateString("en-US", options);

    return isCurrentDay ? `${formattedDate} (Today)` : formattedDate;
  }

  formatDateYmd(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toISOString().split("T")[0];
  }

  formatDateLong(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
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
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toISOString();
  }

  updateSelectedDateDisplay(formattedDate) {
    const selectedDateDisplay =
      this.shadowRoot.querySelector(".selected-date bdi");
    selectedDateDisplay.textContent = formattedDate;
  }

  updateSelectedDateElements(formattedDate) {
    const date = new Date(`${formattedDate}T00:00:00Z`);
    const selectedDateYmd = this.formatDateYmd(date);
    const selectedFormatted = this.formatDateLong(date);
    const selectedIsoFormatted = this.formatISODate(date);

    const selectedDateDisplayYmd =
      this.shadowRoot.querySelector(".selected-date-Ymd");
    const selectedDateDisplayFull = this.shadowRoot.querySelector(
      ".selected-formatted-date"
    );
    const selectedDateDisplayIso = this.shadowRoot.querySelector(
      ".selected-formatted-iso"
    );

    selectedDateDisplayYmd.textContent = selectedDateYmd;
    selectedDateDisplayFull.textContent = selectedFormatted;
    selectedDateDisplayIso.textContent = selectedIsoFormatted;

    this.updateSelectedDateDisplay(selectedFormatted);
  }

  updateActiveDateElements() {
    const focusedSpan = this.shadowRoot.querySelector(
      ".calendar-grid-item span.focus"
    );
    const activeDateYMD = this.shadowRoot.querySelector(".active-date-ymd");
    const activeLongDate = this.shadowRoot.querySelector(
      ".active-formatted-date-long"
    );
    const activeIsoDate = this.shadowRoot.querySelector(
      ".active-formatted-iso"
    );

    if (!activeDateYMD || !activeLongDate || !activeIsoDate) {
      console.error("One or more active date elements are missing");
      return;
    }

    if (focusedSpan) {
      const dataDate = focusedSpan.parentElement.getAttribute("data-date");
      const date = new Date(`${dataDate}T00:00:00Z`);
      activeDateYMD.textContent = dataDate;
      activeLongDate.textContent = this.formatDateLong(date);
      activeIsoDate.textContent = this.formatISODate(date);
    } else {
      activeDateYMD.textContent = "Date not selected";
      activeLongDate.textContent = "Date not selected";
      activeIsoDate.textContent = "Date not selected";
    }
  }

  handleDayClick(event) {
    const clickedSpan = event.target;
    const dayContainer = clickedSpan.parentElement;

    const isPreviousMonthDay =
      dayContainer.classList.contains("previous-month-day");
    const isNextMonthDay = dayContainer.classList.contains("next-month-day");

    const isActive = clickedSpan.classList.contains("active");

    if (!isPreviousMonthDay && !isNextMonthDay) {
      this.clearActiveState();

      if (!isActive) {
        clickedSpan.classList.add("active", "btn-primary", "focus");

        const selectedDateElement = this.shadowRoot.getElementById(
          `cell-${dayContainer.dataset.date}`
        );
        if (selectedDateElement) {
          const existingAriaLabel =
            selectedDateElement.getAttribute("aria-label");
          selectedDateElement.setAttribute(
            "aria-label",
            `${existingAriaLabel} (Selected)`
          );
          selectedDateElement.setAttribute("aria-selected", "true");
          selectedDateElement.setAttribute("aria-current", "date");
        }
      }

      this.selectedMonth = parseInt(dayContainer.dataset.month);
      this.selectedYear = parseInt(dayContainer.dataset.year);
      const selectedDay = parseInt(clickedSpan.textContent);
      this.selectedDate = new Date(
        Date.UTC(this.selectedYear, this.selectedMonth - 1, selectedDay)
      );

      const formattedSelectedDate = this.formatDate(
        this.selectedYear,
        this.selectedMonth,
        selectedDay
      );
      this.updateSelectedDateDisplay(formattedSelectedDate);
      this.updateSelectedDateElements(
        this.selectedDate.toISOString().split("T")[0]
      );
      this.updateActiveDateElements();

      this.currentSelectedDate = new Date(
        Date.UTC(this.selectedYear, this.selectedMonth - 1, selectedDay)
      );

      const formattedCurrentDate = this.formatDate(
        this.currentSelectedDate.getUTCFullYear(),
        this.currentSelectedDate.getUTCMonth() + 1,
        this.currentSelectedDate.getUTCDate()
      );

      this.updateSelectedDateElements(
        this.currentSelectedDate.toISOString().split("T")[0]
      );

      this.shadowRoot.querySelector(".calendar").classList.add("focus");
      this.isCalendarFocused = true;

      const formattedDate = `${this.selectedDate.getUTCFullYear()}-${(
        this.selectedDate.getUTCMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${this.selectedDate
        .getUTCDate()
        .toString()
        .padStart(2, "0")}`;
      this.shadowRoot
        .querySelector(".calendar")
        .setAttribute("aria-activedescendant", `cell-${formattedDate}`);
    } else {
      if (isPreviousMonthDay) {
        this.currentMonth--;
        if (this.currentMonth < 0) {
          this.currentMonth = 11;
          this.currentYear--;
        }
      } else if (isNextMonthDay) {
        this.currentMonth++;
        if (this.currentMonth > 11) {
          this.currentMonth = 0;
          this.currentYear++;
        }
      }

      this.selectedMonth = parseInt(dayContainer.dataset.month);
      this.selectedYear = parseInt(dayContainer.dataset.year);
      const selectedDay = parseInt(clickedSpan.textContent);
      this.selectedDate = new Date(
        Date.UTC(this.selectedYear, this.selectedMonth - 1, selectedDay)
      );

      this.renderCalendar(this.currentMonth, this.currentYear);

      const formattedDate = `${this.selectedDate.getUTCFullYear()}-${(
        this.selectedDate.getUTCMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${this.selectedDate
        .getUTCDate()
        .toString()
        .padStart(2, "0")}`;
      this.shadowRoot
        .querySelector(".calendar")
        .setAttribute("aria-activedescendant", `cell-${formattedDate}`);

      const newFocusCell = this.shadowRoot.querySelector(
        `.calendar-grid-item[data-date="${formattedDate}"]`
      );
      if (newFocusCell) {
        newFocusCell.focus();
        this.shadowRoot
          .querySelector(".calendar")
          .setAttribute("aria-activedescendant", newFocusCell.id);
      }

      this.setActiveState();
      this.updateSelectedDateElements(formattedDate);
      this.updateActiveDateElements();

      // Ensure the focus remains on the selected day
      setTimeout(() => {
        newFocusCell?.querySelector("span")?.focus();
      }, 0);
    }

    this.setActiveState();
  }

  handleEnterKeyPress(event) {
    event.stopPropagation();

    const focusedSpan = this.shadowRoot.querySelector(
      ".calendar-grid-item span.focus"
    );
    if (focusedSpan) {
      const dayContainer = focusedSpan.parentElement;

      const isPreviousMonthDay =
        dayContainer.classList.contains("previous-month-day");
      const isNextMonthDay = dayContainer.classList.contains("next-month-day");

      const isActive = focusedSpan.classList.contains("active");

      if (isActive && !isPreviousMonthDay && !isNextMonthDay) {
        return; // Do nothing if the active day is pressed again
      } else {
        this.handleDayClick({ target: focusedSpan });
      }
    }
  }

  handleDateNavigation(event, direction) {
    const focusedElement = this.shadowRoot.activeElement;

    if (focusedElement.classList.contains("calendar-grid-item")) {
      let calendarCells = this.shadowRoot.querySelectorAll(
        ".calendar-grid-item"
      );
      const currentIndex = Array.from(calendarCells).indexOf(focusedElement);

      if (currentIndex !== -1) {
        let newIndex =
          direction === "next" ? currentIndex + 1 : currentIndex - 1;

        if (direction === "up" && currentIndex < 7) {
          // Move to the previous month and set focus on the correct day
          this.prevMonth();
          const daysInPrevMonth = new Date(
            this.currentYear,
            this.currentMonth + 1,
            0
          ).getUTCDate();
          newIndex = daysInPrevMonth - (7 - currentIndex);
          calendarCells = this.shadowRoot.querySelectorAll(
            ".calendar-grid-item"
          );
        } else if (
          direction === "down" &&
          currentIndex >= calendarCells.length - 7
        ) {
          // Move to the next month and set focus on the correct day
          this.nextMonth();
          newIndex = currentIndex % 7;
          calendarCells = this.shadowRoot.querySelectorAll(
            ".calendar-grid-item"
          );
        }

        const targetCell = calendarCells[newIndex];
        const targetSpan = targetCell.querySelector("span");

        const previousFocusedSpan = this.shadowRoot.querySelector(
          ".calendar-grid-item span.focus"
        );
        if (previousFocusedSpan) {
          previousFocusedSpan.classList.remove("focus");
        }

        targetSpan.classList.add("focus");

        targetCell.focus();
        this.updateActiveDateElements();
      }
    }
  }

  clearActiveState() {
    const allSpans = this.shadowRoot.querySelectorAll(
      ".calendar-grid-item span"
    );
    allSpans.forEach((span) => {
      span.classList.remove("active", "btn-primary", "focus");
      span.classList.add("btn-outline-light", "text-dark");

      const dateElement = this.shadowRoot.getElementById(
        `cell-${span.parentElement.dataset.date}`
      );
      if (dateElement) {
        const existingAriaLabel = dateElement.getAttribute("aria-label");
        if (existingAriaLabel.endsWith(" (Selected)")) {
          dateElement.setAttribute(
            "aria-label",
            existingAriaLabel.slice(0, -11)
          );
          dateElement.removeAttribute("aria-selected");
          dateElement.removeAttribute("aria-current");
        }
      }
    });
  }

  setActiveState() {
    const activeSpan = this.shadowRoot.querySelector(".active");
    if (activeSpan) {
      activeSpan.classList.remove("active", "btn-primary", "focus");
      activeSpan.classList.add("btn-outline-light", "text-dark");
    }

    if (this.selectedDate) {
      const selectedDateElement = this.shadowRoot.getElementById(
        `cell-${this.selectedDate.getUTCFullYear()}-${(
          this.selectedDate.getUTCMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${this.selectedDate
          .getUTCDate()
          .toString()
          .padStart(2, "0")}`
      );
      if (selectedDateElement) {
        const selectedSpan = selectedDateElement.querySelector("span");
        selectedSpan.classList.add("active", "btn-primary", "focus");
        selectedSpan.classList.remove("btn-outline-light", "text-dark");
      }
    }
  }

  renderCalendar(month0b, year) {
    const calendarGrid = this.shadowRoot.querySelector(".calendar-grid");
    calendarGrid.innerHTML = "";

    const displayMonth = month0b + 1;
    const previousMonthLastDate = new Date(
      Date.UTC(year, month0b, 0)
    ).getUTCDate();
    const firstDay = this.getFirstDayOfMonth(year, month0b);
    const daysInMonth = new Date(Date.UTC(year, month0b + 1, 0)).getUTCDate();
    const firstDayOfWeek = firstDay === 0 ? 0 : firstDay;
    let date = 1;
    const totalWeeks = Math.ceil((firstDayOfWeek + daysInMonth) / 7);

    const options = {
      year: "numeric",
      month: "long",
    };

    const formattedMonthYear = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(new Date(year, month0b, 1));
    this.shadowRoot.querySelector(
      "#__CDID__calendar-grid-caption_"
    ).textContent = formattedMonthYear;

    for (let i = 0; i < totalWeeks; i++) {
      for (let j = 0; j < 7; j++) {
        const dayItem = document.createElement("div");
        dayItem.classList.add("calendar-grid-item");
        dayItem.setAttribute("role", "button");
        dayItem.setAttribute("tabindex", "-1"); // Disable tabbing

        const currentDate = new Date(Date.UTC(year, month0b, date));
        const today = new Date();
        dayItem.dataset.month = displayMonth;
        dayItem.dataset.year = currentDate.getUTCFullYear();
        dayItem.dataset.day = currentDate.getUTCDate();

        const dataDate = `${year}-${displayMonth
          .toString()
          .padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
        dayItem.dataset.date = dataDate;
        dayItem.id = `cell-${dataDate}`;

        const isCurrentDay =
          today.getUTCDate() === date &&
          today.getUTCMonth() === month0b &&
          today.getUTCFullYear() === year;
        const isSelectedDay =
          this.selectedDate &&
          this.selectedDate.getUTCDate() === date &&
          this.selectedDate.getUTCMonth() === month0b &&
          this.selectedDate.getUTCFullYear() === year;

        const dayNumberSpan = document.createElement("span");
        dayNumberSpan.classList.add(
          "btn",
          "btn-outline-light",
          "border-0",
          "rounded-circle",
          "text-nowrap",
          "text-dark",
          "font-weight-bold"
        );

        if (i === 0 && j < firstDayOfWeek && firstDayOfWeek > 0) {
          const previousMonthDay =
            previousMonthLastDate - firstDayOfWeek + j + 1;
          dayNumberSpan.textContent = previousMonthDay;
          dayItem.classList.add("previous-month-day");
          dayNumberSpan.classList.add("text-muted");
          dayNumberSpan.classList.remove("text-dark", "font-weight-bold");

          const previousMonth = month0b === 0 ? 11 : month0b - 1;
          const previousYear = month0b === 0 ? year - 1 : year;
          dayItem.dataset.month = previousMonth + 1;
          dayItem.dataset.year = previousYear;
          dayItem.dataset.day = previousMonthDay;
          const previousMonthDataDate = `${
            dayItem.dataset.year
          }-${dayItem.dataset.month
            .toString()
            .padStart(2, "0")}-${dayItem.dataset.day
            .toString()
            .padStart(2, "0")}`;
          dayItem.dataset.date = previousMonthDataDate;
          dayItem.id = `cell-${previousMonthDataDate}`;
          const formattedDate = new Date(
            Date.UTC(
              dayItem.dataset.year,
              dayItem.dataset.month - 1,
              dayItem.dataset.day
            )
          ).toLocaleDateString("en-US", options);
          dayItem.setAttribute("aria-label", formattedDate);
        } else if (date <= daysInMonth) {
          dayNumberSpan.textContent = date;
          dayItem.dataset.month = displayMonth;
          dayItem.dataset.year = year;
          dayItem.dataset.day = date;

          const formattedDate = currentDate.toLocaleDateString(
            "en-US",
            options
          );

          if (isCurrentDay) {
            dayNumberSpan.classList.add("current-day");
            dayItem.setAttribute(
              "aria-label",
              this.formatDateForAriaLabel(formattedDate, true)
            );
          } else {
            dayItem.setAttribute("aria-label", formattedDate);
          }

          if (isSelectedDay) {
            dayNumberSpan.classList.add("active", "btn-primary", "focus");
            dayNumberSpan.classList.remove("btn-outline-light", "text-dark");
            const existingAriaLabel = dayItem.getAttribute("aria-label");
            dayItem.setAttribute(
              "aria-label",
              existingAriaLabel + " (Selected)"
            );
            this.updateSelectedDateDisplay(
              this.formatDate(year, displayMonth, date)
            );
            this.updateActiveDateElements();
          }

          date++;
        } else {
          const nextMonthDay = date - daysInMonth;
          dayNumberSpan.textContent = nextMonthDay;
          dayItem.classList.add("next-month-day");
          dayNumberSpan.classList.add("text-muted");
          dayNumberSpan.classList.remove("text-dark", "font-weight-bold");

          dayItem.dataset.month = (month0b === 11 ? 0 : month0b + 1) + 1;
          dayItem.dataset.year = month0b === 11 ? year + 1 : year;
          dayItem.dataset.day = nextMonthDay;
          const nextMonthDataDate = `${
            dayItem.dataset.year
          }-${dayItem.dataset.month
            .toString()
            .padStart(2, "0")}-${dayItem.dataset.day
            .toString()
            .padStart(2, "0")}`;
          dayItem.dataset.date = nextMonthDataDate;
          const formattedDate = new Date(
            Date.UTC(
              dayItem.dataset.year,
              dayItem.dataset.month - 1,
              dayItem.dataset.day
            )
          ).toLocaleDateString("en-US", options);
          dayItem.setAttribute("aria-label", formattedDate);
          dayItem.id = `cell-${nextMonthDataDate}`;
          date++;
        }

        dayItem.appendChild(dayNumberSpan);

        // Add the focus event listener to the calendar-grid-item
        dayItem.addEventListener("focus", (event) => {
          dayNumberSpan.classList.add("focus");
          this.shadowRoot.querySelector(".calendar").classList.add("focus");
        });

        // Add click and keydown event listeners
        dayNumberSpan.addEventListener("click", this.handleDayClick.bind(this));
        dayNumberSpan.addEventListener(
          "keydown",
          this.handleEnterKeyPress.bind(this)
        );
        calendarGrid.appendChild(dayItem);
      }
    }
    this.setActiveState();
  }

  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  prevYear() {
    this.currentYear--;
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  nextYear() {
    this.currentYear++;
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  currentDate() {
    const today = new Date();
    this.selectedDate = today;
    this.currentMonth = today.getUTCMonth();
    this.currentYear = today.getUTCFullYear();
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  handleKeyDown(event) {
    const calendarGrid = this.shadowRoot.querySelector(".calendar-grid");
    let currentFocus = this.shadowRoot.activeElement;
    let calendarCells = calendarGrid.querySelectorAll(".calendar-grid-item");

    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
      let index = Array.from(calendarCells).indexOf(currentFocus);

      if (index !== -1) {
        let newIndex = index;

        if (event.key === "ArrowUp") {
          if (index < 7) {
            // If in the first row, move to the previous month
            const prevMonthLastDay = new Date(
              this.currentYear,
              this.currentMonth,
              0
            ).getUTCDate();
            const offset = 7 - index;
            this.prevMonth();
            calendarCells = this.shadowRoot.querySelectorAll(
              ".calendar-grid-item"
            );
            newIndex = calendarCells.length - offset;
          } else {
            newIndex = Math.max(index - 7, 0); // Move up within the current month
          }
        } else if (event.key === "ArrowDown") {
          if (index >= calendarCells.length - 7) {
            // If in the last row, move to the next month
            const offset = index % 7;
            this.nextMonth();
            calendarCells = this.shadowRoot.querySelectorAll(
              ".calendar-grid-item"
            );
            newIndex = offset;
          } else {
            newIndex = Math.min(index + 7, calendarCells.length - 1); // Move down within the current month
          }
        } else if (event.key === "ArrowLeft") {
          newIndex = index - 1;
          if (newIndex < 0) {
            this.prevMonth();
            calendarCells = this.shadowRoot.querySelectorAll(
              ".calendar-grid-item"
            ); // Update after rendering new month
            newIndex = calendarCells.length - 1; // Move focus to the last day of the previous month
          }
        } else if (event.key === "ArrowRight") {
          newIndex = index + 1;
          if (newIndex >= calendarCells.length) {
            this.nextMonth();
            calendarCells = this.shadowRoot.querySelectorAll(
              ".calendar-grid-item"
            ); // Update after rendering new month
            newIndex = 0; // Move focus to the first day of the next month
          }
        }

        const targetCell = calendarCells[newIndex];
        if (targetCell) {
          const targetSpan = targetCell.querySelector("span");

          const previousFocusedSpan = this.shadowRoot.querySelector(
            ".calendar-grid-item span.focus"
          );
          if (previousFocusedSpan) {
            previousFocusedSpan.classList.remove("focus");
          }

          targetSpan.classList.add("focus");

          targetCell.focus();
          this.updateActiveDateElements();
        }
      }
    } else if (event.key === "Enter" || event.key === " ") {
      this.handleEnterKeyPress(event);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("keydown", this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this.handleKeyDown);
  }

  updateInitialContext() {
    const today = new Date();
    const activeDateYMD = this.shadowRoot.querySelector(".active-date-ymd");
    const activeLongDate = this.shadowRoot.querySelector(
      ".active-formatted-date-long"
    );
    const activeIsoDate = this.shadowRoot.querySelector(
      ".active-formatted-iso"
    );

    activeDateYMD.textContent = this.formatDateYmd(today);
    activeLongDate.textContent = this.formatDateLong(today);
    activeIsoDate.textContent = this.formatISODate(today);
  }
}

customElements.define("date-picker", DatePicker);
