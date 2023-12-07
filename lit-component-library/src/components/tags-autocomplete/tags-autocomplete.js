import { LitElement, html, css } from "lit-element";

class TagsAutocomplete extends LitElement {
  constructor() {
    super();
    this.tags = []; // Initialize tags as an empty array
    this.bFocusDiv = null; // Initialize bFocusDiv
    this.tagList = null; // Initialize tagList
    this.handleRemoveTag = this.handleRemoveTag.bind(this); // Add this line
  }

  static styles = css`
    /* Your CSS styles go here */
  `;

  render() {
    return html`
      <link
        rel="stylesheet"
        href="../../../node_modules/bootstrap/dist/css/bootstrap.css"
      />
      <link rel="stylesheet" href="./tags-autocomplete.css" />

      <div class="tag-component-wrapper">
        <div class="tags-wrapper" tabindex="0">
          <div
            id="tag-container"
            class="tag-container"
            role="region"
            aria-live="polite"
            aria-label="Selected Tags"
          >
            <ul id="tag-list" class="tag-list">
              <!-- Tags will be added here -->
            </ul>
          </div>

          <div class="input-container" tabindex="0">
            <div class="input-group">
              <input
                id="tag-input"
                type="text"
                class="input"
                placeholder="Enter a term or keyword"
                aria-label="Enter a term or keyword"
                role="textbox"
                aria-multiline="false"
                tabindex="1"
              />
              <div class="input-group-prepend px-2">
                <button
                  id="clear-button"
                  class="clear-btn btn btn-outline-secondary"
                  aria-label="Clear Input Field"
                  role="button"
                  title="Clear Input Field"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path
                      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    />
                  </svg>
                </button>
              </div>
              <div class="input-group-prepend">
                <button
                  id="add-button"
                  class="add-btn btn btn-outline-secondary"
                  aria-label="Add tag"
                  role="button"
                  title="Add tag"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Focus indication elements -->
          <div class="b-underline" role="presentation">
            <div class="b-focus" role="presentation"></div>
          </div>

          <!-- Autocomplete suggestions container -->
          <div
            class="autocomplete-suggestions"
            id="tag-suggestions"
            tabindex="0"
            aria-expanded="false"
            style="display: none"
            role="listbox"
            aria-labelledby="suggestions-label"
          ></div>
        </div>

        <!-- Error message display -->
        <div
          id="error-message"
          class="tag-exists d-none"
          role="alert"
          aria-live="assertive"
        >
          The term or keyword already exists.
        </div>
      </div>
      <script src="../../../node_modules/bootstrap/dist/js/bootstrap.js"></script>
      <script src="../../../node_modules/@popperjs/core/lib/popper.js"></script>
    `;
  }

  createTag(tag) {
    const newTag = document.createElement("li");
    newTag.classList.add("tag", "badge", "bg-secondary");
    newTag.dataset.tag = tag;
    newTag.setAttribute("role", "option");
    newTag.setAttribute("tabindex", "0");
    newTag.innerHTML = `
      <span>${tag}</span>
      <button data-tag="${tag}" class="remove-btn" title="Remove Tag" aria-label="Remove Tag">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c-9.4-9.4-9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
        </svg>
      </button>`;
    this.tagList.appendChild(newTag);

    // Event listener for removing tags
    newTag
      .querySelector(".remove-btn")
      .addEventListener("click", this.handleRemoveTag);
  }

  handleRemoveTag(event) {
    const tag = event.target.getAttribute("data-tag");
    const index = this.tags.indexOf(tag);

    if (index !== -1) {
      this.tags.splice(index, 1);
      event.target.closest("li").remove();
      this.saveTagsToLocalStorage();
      this.hideErrorMessage();
    }
  }

  // Load tags from local storage
  loadTagsFromLocalStorage() {
    const savedTags = localStorage.getItem("tags");
    if (savedTags) {
      this.tags = JSON.parse(savedTags);
      this.tags.forEach((tag) => this.createTag(tag));
    }
  }

  firstUpdated() {
    super.firstUpdated();

    // Use setTimeout to ensure that the elements are available
    setTimeout(() => {
      // Get references to HTML elements within the shadow DOM
      const tagInput = this.shadowRoot.getElementById("tag-input");
      const inputContainer = this.shadowRoot.querySelector(".input-container");
      this.tagList = this.shadowRoot.getElementById("tag-list"); // Initialize tagList

      if (tagInput && inputContainer) {
        const addButton = this.shadowRoot.getElementById("add-button");
        const clearButton = this.shadowRoot.getElementById("clear-button");
        // const tagContainer = this.shadowRoot.getElementById("tag-container");

        // const tagList = this.shadowRoot.getElementById("tag-list");

        const tagDropdown = this.shadowRoot.getElementById("tag-suggestions");
        const tagSuggestions =
          this.shadowRoot.getElementById("tag-suggestions");

        // Event listener for when the input container is clicked
        const tagsWrapper = this.shadowRoot.querySelector(".tags-wrapper");
        this.bFocusDiv = this.shadowRoot.querySelector(".b-focus");

        // Event listener for when the input container is clicked
        tagsWrapper.addEventListener("click", (event) => {
          // Check if the click is not on the tag dropdown or autocomplete suggestions
          if (
            !tagDropdown.contains(event.target) &&
            !event.target.classList.contains("autocomplete-suggestions")
          ) {
            this.bFocusDiv.style.width = "100%";
            this.bFocusDiv.style.left = "0";
          }
        });

        // Add focus and blur event listeners to apply and remove focus styles
        tagsWrapper.addEventListener("focus", () => {
          tagsWrapper.classList.add("focused");
        });

        tagsWrapper.addEventListener("blur", () => {
          tagsWrapper.classList.remove("focused");
        });

        // Add focus and blur event listeners to apply and remove focus styles
        inputContainer.addEventListener("focusin", () => {
          inputContainer.classList.add("focused");
        });

        inputContainer.addEventListener("focusout", () => {
          inputContainer.classList.remove("focused");
        });

        tagInput.addEventListener("keydown", (event) => {
          if (event.key === "Alt" && !event.shiftKey) {
            // Tab key was pressed (forward tab navigation)
            tagSuggestions.focus(); // Move focus to the tag-suggestions div
            event.preventDefault(); // Prevent the default Tab key behavior
          }
        });

        // Event listener for when clicking outside the input container
        document.addEventListener("mousedown", (event) => {
          const isTagSuggestionClicked =
            event.target.closest(".tag-suggestions");
          const isTagSuggestionChild = tagDropdown.contains(event.target);

          if (!isTagSuggestionClicked && !isTagSuggestionChild) {
            this.bFocusDiv.style.width = "0";
            this.bFocusDiv.style.left = "50%";
            tagDropdown.innerHTML = "";
            tagDropdown.style.display = "none";
          }
        });

        // Function to remove a tag
        function removeTag(tag) {
          const tagToRemove = this.tagList.querySelector(
            `.tag[data-tag="${tag}"]`
          );
          if (tagToRemove) {
            this.tagList.removeChild(tagToRemove);
          }
        }

        const displayErrorMessage = (message) => {
          const errorMessage = this.shadowRoot.getElementById("error-message");
          errorMessage.textContent = message;
          errorMessage.classList.remove("d-none");
        };

        const hideErrorMessage = () => {
          const errorMessage = this.shadowRoot.getElementById("error-message");
          errorMessage.textContent = "";
          errorMessage.classList.add("d-none");
        };

        // Function to update the position of the suggestions div
        function updateSuggestionsPosition() {
          const inputContainer = document.querySelector(".input-container");
          if (!inputContainer) return; // Ensure inputContainer exists before proceeding
          const suggestionsDiv = document.getElementById("tag-suggestions");
          const inputRect = inputContainer.getBoundingClientRect();
          const availableSpaceAbove = inputRect.top;
          const availableSpaceBelow = window.innerHeight - inputRect.bottom;

          // Remove any inline styles before repositioning
          suggestionsDiv.style.top = "";
          suggestionsDiv.style.bottom = "";

          if (availableSpaceBelow >= suggestionsDiv.clientHeight) {
            // There's enough space below, so no need for explicit positioning
          } else if (availableSpaceAbove >= suggestionsDiv.clientHeight) {
            // There's enough space above, so position above the input container
            suggestionsDiv.style.top = "auto";
            suggestionsDiv.style.bottom = inputRect.height + "px";
          } else {
            // Not enough space above or below, hide the suggestions div
            suggestionsDiv.style.display = "none";
          }
        }

        // Function to handle scroll events
        function handleScroll() {
          updateSuggestionsPosition();
        }

        const addTag = () => {
          const tagInputValue = tagInput.value.trim();
          if (tagInputValue !== "") {
            const tagsToAdd = tagInputValue.split(/[ ,;]/);
            let hasError = false;

            tagsToAdd
              .filter((tag) => tag.trim() !== "")
              .forEach((tag) => {
                if (this.tags.includes(tag)) {
                  hasError = true;
                  displayErrorMessage("The term or keyword already exists.");
                } else {
                  this.tags.push(tag); // Use this.tags to access the class property
                  this.createTag(tag); // Use this.createTag
                }
              });

            if (!hasError) {
              hideErrorMessage();
              tagInput.value = "";
              saveTagsToLocalStorage();
            }
          }
        };

        const saveTagsToLocalStorage = () => {
          localStorage.setItem("tags", JSON.stringify(this.tags));
        };

        // Load saved tags from local storage when the page loads
        this.loadTagsFromLocalStorage();

        // Event listener for user interactions and UI elements
        this.tagList.addEventListener("click", (event) => {
          const removeButton = event.target.closest(".remove-btn");
          if (removeButton) {
            const tag = removeButton.getAttribute("data-tag");
            const index = this.tags.indexOf(tag);

            if (index !== -1) {
              this.tags.splice(index, 1);
              removeButton.closest("li").remove();
              saveTagsToLocalStorage(); // Call the local function, not this.saveTagsToLocalStorage
              this.hideErrorMessage();
            }
          }
        });

        this.tagList.addEventListener("keydown", (event) => {
          if (
            event.key === "Enter" &&
            event.target.classList.contains("remove-btn")
          ) {
            this.handleRemoveTag(event);
            event.preventDefault(); // Prevent the default Enter key behavior
          }
        });

        // Define the updateTagDropdown function
        this.updateTagDropdown = () => {
          const tagInputValue = tagInput.value.trim().toLowerCase();
          tagDropdown.innerHTML = "";
        
          if (tagInputValue !== "") {
            const filteredTags = this.tags.filter((tag) =>
              tag.toLowerCase().startsWith(tagInputValue)
            );
        
            if (filteredTags.length > 0) {
              filteredTags.forEach((tag) => {
                const option = document.createElement("a");
                option.textContent = tag;
                option.setAttribute("role", "option");
                option.setAttribute("aria-label", tag);
                option.tabIndex = -1;
                option.addEventListener("mousedown", (e) => {
                  tagInput.value = tag;
                  tagDropdown.innerHTML = "";
                  setTimeout(() => {
                    tagInput.focus(); // Set focus back to the input field
                  });
                  e.stopPropagation();
                });
                tagDropdown.appendChild(option);
              });
              tagDropdown.setAttribute("aria-expanded", "true");
              tagDropdown.style.display = "block";
            } else {
              tagDropdown.setAttribute("aria-expanded", "false");
              tagDropdown.style.display = "none";
            }
          } else {
            tagDropdown.innerHTML = "";
            tagDropdown.setAttribute("aria-expanded", "false");
            tagDropdown.style.display = "none";
          }
        };

        // Bind the updateTagDropdown function to this class instance
        this.updateTagDropdown = this.updateTagDropdown.bind(this);

        // Event listeners for user interactions and UI elements
        addButton.addEventListener("click", () => addTag());
        addButton.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            addTag.call(this); // Ensure the function is called in the correct context
            event.preventDefault(); // Prevent the default Enter key behavior
          }
        });

        tagInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            addTag();
            tagDropdown.style.display = "none";
          }
        });

        tagInput.addEventListener("input", () => {
          const tagInputValue = tagInput.value.trim();
          if (tagInputValue === "") {
            hideErrorMessage();
            tagDropdown.innerHTML = ""; // Clear suggestions when input is empty
          }
          this.updateTagDropdown(); // Use the bound function
          updateSuggestionsPosition(); // Update the suggestions div position
        });

        clearButton.addEventListener("click", () => {
          hideErrorMessage();
          saveTagsToLocalStorage();
          tagInput.value = "";
        });

        clearButton.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            hideErrorMessage();
            saveTagsToLocalStorage();
            tagInput.value = "";
            event.preventDefault(); // Prevent the default Enter key behavior
          }
        });

        tagSuggestions.addEventListener("keydown", (event) => {
          const suggestionLinks =
            tagSuggestions.querySelectorAll('a[role="option"]');
          const focusedIndex = Array.from(suggestionLinks).indexOf(
            document.activeElement
          );

          if (event.key === "ArrowDown") {
            // Navigate down
            event.preventDefault();
            const nextIndex = (focusedIndex + 1) % suggestionLinks.length;
            suggestionLinks[nextIndex].focus();
          } else if (event.key === "ArrowUp") {
            // Navigate up
            event.preventDefault();
            const prevIndex =
              (focusedIndex - 1 + suggestionLinks.length) %
              suggestionLinks.length;
            suggestionLinks[prevIndex].focus();
          } else if (event.key === "Enter" || event.key === "Tab") {
            // Select the suggestion and move focus back to input field
            event.preventDefault();
            const activeLink = suggestionLinks[focusedIndex];
            tagInput.value = activeLink.textContent;
            tagSuggestions.style.display = "none";
            tagInput.focus();
          }
        });

        // Event listener for scroll events on the tagDropdown
        tagDropdown.addEventListener("scroll", (e) => {
          e.stopPropagation();
        });

        // Event listener for scroll events on the window
        window.addEventListener("scroll", (e) => {
          if (tagDropdown.style.display === "block") {
            e.preventDefault();
            e.stopPropagation();
          }
        });

        // Event listener for window resize
        window.addEventListener("resize", () => {
          // Call the function to update the suggestions div position
          updateSuggestionsPosition();
        });

        // Event listener for scroll events
        window.addEventListener("scroll", handleScroll);
      }
    });
  }
}

customElements.define("tags-autocomplete", TagsAutocomplete);
