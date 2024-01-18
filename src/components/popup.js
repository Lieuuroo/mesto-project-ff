export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupPressingEsc);
  popup.addEventListener("click", closePopupClickingOverlay);
};

export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupPressingEsc);
  popup.removeEventListener("click", closePopupClickingOverlay);
};

function closePopupPressingEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

function closePopupClickingOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}
