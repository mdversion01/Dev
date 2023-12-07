import { LitElement, html, css } from "lit-element";

class TagsBasic extends LitElement {
  constructor() {
    super();
    this.bFocusDiv = null; // Initialize bFocusDiv
  }

  static styles = css`
    /* Your CSS styles go here */
  `;

  // Initialize the tags array as a property
  tags = [];

  render() {
    return html`
      <link
        rel="stylesheet"
        href="../../../node_modules/bootstrap/dist/css/bootstrap.css"
      />
      <link rel="stylesheet" href="./tags-basic.css" />

      <!-- Your HTML goes here -->
      <div class="tag-component-wrapper">
        <!-- Tag wrapper container -->
        <div class="tags-wrapper" tabindex="0">
          <!-- Tag container to display selected tags -->
          <div
            id="tag-container"
            class="tag-container"
            role="region"
            aria-live="polite"
            aria-label="Selected Tags"
          ></div>
          <!-- Input container -->
          <div class="input-container" tabindex="0">
            <!-- Input group containing the tag input, clear button, and add button -->
            <div class="input-group">
              <input
                id="tag-input"
                class="input"
                type="text"
                placeholder="Enter a term or keyword"
                aria-label="Enter a term or keyword"
                role="textbox"
                aria-multiline="false"
              />
              <div class="input-group-prepend px-2">
                <button
                  id="clear-button"
                  class="clear-btn btn btn-outline-secondary"
                  aria-label="Clear all tags"
                  role="button"
                  title="Clear all tags"
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
      </div>
      <script src="../../../node_modules/bootstrap/dist/js/bootstrap.js"></script>
      <script src="../../../node_modules@popperjscorelibpopper.js"></script>
    `;
  }

  firstUpdated() {
    super.firstUpdated();

    setTimeout(() => {
      // Get references to HTML elements within the shadow DOM
      const tagInput = this.shadowRoot.getElementById("tag-input");
      const inputContainer = this.shadowRoot.querySelector(".input-container");

      if (tagInput && inputContainer) {
        const addButton = this.shadowRoot.getElementById("add-button");
        const clearButton = this.shadowRoot.getElementById("clear-button");
        const tagContainer = this.shadowRoot.getElementById("tag-container");

        // Event listener for when the input container is clicked
        const tagsWrapper = this.shadowRoot.querySelector(".tags-wrapper");
        this.bFocusDiv = this.shadowRoot.querySelector(".b-focus");

        // Initialize bFocusDiv styles
        this.bFocusDiv.style.width = "0";
        this.bFocusDiv.style.left = "50%";

        tagsWrapper.addEventListener("click", () => {
          this.bFocusDiv.style.width = "100%";
          this.bFocusDiv.style.left = "0";
          tagInput.focus(); // Focus the tag input field
        });

        document.addEventListener("mousedown", (event) => {
          if (!tagsWrapper.contains(event.target)) {
            this.bFocusDiv.style.width = "0";
            this.bFocusDiv.style.left = "50%";
          }
        });

        tagsWrapper.addEventListener("focus", () => {
          tagsWrapper.classList.add("focused");
        });

        tagsWrapper.addEventListener("blur", () => {
          tagsWrapper.classList.remove("focused");
        });

        inputContainer.addEventListener("focusin", () => {
          inputContainer.classList.add("focused");
        });

        inputContainer.addEventListener("focusout", () => {
          inputContainer.classList.remove("focused");
        });

        // Updated createBadge function
        function createBadge(tag) {
          const badge = document.createElement("div");
          badge.classList.add("badge", "bg-secondary");
          badge.dataset.tag = tag;
          badge.setAttribute("role", "option");
          badge.setAttribute("tabindex", "0");
          badge.innerHTML = `
    <span>${tag}</span>
    <button data-tag="${tag}" role="button" class="remove-btn" title="Remove Tag" aria-label="Remove Tag">
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c-9.4-9.4-9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
    </button>`;

          badge.querySelector(".remove-btn").addEventListener("click", () => {
            removeBadge(badge, tag);
          });

          badge
            .querySelector(".remove-btn")
            .addEventListener("keydown", (event) => {
              if (event.key === "Enter") {
                removeBadge(badge, tag);
              }
            });

          tagContainer.appendChild(badge);
        }

        // Updated removeBadge function
        const removeBadge = (badge, tag) => {
          badge.remove(); // Remove the badge
          const index = this.tags.indexOf(tag);
          if (index !== -1) {
            this.tags.splice(index, 1);
          }
          this.hideErrorMessage(); // Hide the validation message
        };

        const addTag = () => {
          const tagInputValue = tagInput.value.trim();
          if (tagInputValue !== "") {
            const tagsToAdd = tagInputValue.split(/[ ,;]/);
            let hasError = false;

            tagsToAdd
              .filter((tag) => tag.trim() !== "") // Filter out empty tags
              .forEach((tag) => {
                if (this.tags.includes(tag)) {
                  hasError = true;
                  this.displayErrorMessage(
                    "The term or keyword already exists."
                  );
                } else {
                  this.tags.push(tag);
                  createBadge(tag);
                }
              });

            if (!hasError) {
              this.hideErrorMessage();
              tagInput.value = "";
            }
          }
        };

        // Function to display the validation error message
        this.displayErrorMessage = (message) => {
          const errorMessage = this.shadowRoot.getElementById("error-message");
          errorMessage.textContent = message;
          errorMessage.classList.remove("d-none");
        };

        // Function to hide the validation error message
        this.hideErrorMessage = () => {
          const errorMessage = this.shadowRoot.getElementById("error-message");
          errorMessage.textContent = "";
          errorMessage.classList.add("d-none");
        };

        tagContainer.addEventListener("click", (e) => {
          const clickedElement = e.target;

          if (clickedElement.classList.contains("remove-btn")) {
            const tagToRemove = clickedElement.getAttribute("data-tag");
            const index = this.tags.indexOf(tagToRemove);

            if (index !== -1) {
              this.tags.splice(index, 1);
              removeBadge(tagToRemove);
              this.hideErrorMessage(); // Hide the validation message
            }
          }
        });

        tagInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent Enter from submitting the form
            addTag(); // Add the tag
          } else {
            this.hideErrorMessage(); // Hide the validation message
          }
        });

        addButton.addEventListener("click", addTag);
        addButton.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); // Prevent Enter or Space from triggering a button click
            addTag(); // Add the tag
          }
        });

        clearButton.addEventListener("click", () => {
          this.handleClearTags();
        });

        clearButton.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); // Prevent Enter or Space from triggering a button click
            this.handleClearTags(); // Clear all tags
          }
        });
      }
    });
  }

  handleClearTags() {
    // Call clearTags after the shadow DOM has been fully initialized
    this.clearTags();
  }

  clearTags() {
    // Get a reference to the tag-container element within the shadow DOM
    const tagContainer = this.shadowRoot.getElementById("tag-container");

    // Remove all tags from the container
    while (tagContainer.firstChild) {
      tagContainer.removeChild(tagContainer.firstChild);
    }

    // Clear the tags array
    this.tags.length = 0;

    // Hide the validation message
    this.hideErrorMessage();

    // Get references to other HTML elements within the shadow DOM
    const tagInput = this.shadowRoot.getElementById("tag-input");
    const bFocusDiv = this.shadowRoot.querySelector(".b-focus");

    // Clear the input field
    tagInput.value = "";
    // bFocusDiv.style.width = "0";
    // bFocusDiv.style.left = "50%";
  }
}

customElements.define("tags-basic", TagsBasic);
