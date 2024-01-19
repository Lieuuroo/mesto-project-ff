import "./pages/index.css";
import { initialCards } from "./components/initialCards";
import { createCardElement, handleDelete, handleLike } from "./components/card";
import { openPopup, closePopup } from "./components/popup";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const buttonEditProfilePopupClose = popupEditProfile.querySelector(
  ".popup__close-button"
);
const formEditProfile = document.querySelector(".popup__form-imput-container");
const nameInput = document.querySelector(".popup__form-item_el_name");
const jobInput = document.querySelector(".popup__form-item_el_job");
const placeInput = document.querySelector(".popup__form-item_el_place");
const linkInput = document.querySelector(".popup__form-item_el_link");
const cardsDisplay = document.querySelector(".cards");
const buttonAddCard = document.querySelector(".profile__add-button");
const popupAddCardDisplay = document.querySelector(".popup_type_add-card");
const buttonAddCardClose = popupAddCardDisplay.querySelector(
  ".popup__close-button"
);
const cardForm = document.querySelector(
  ".popup__form-imput-container_type_add-card"
);
const popupCloseupPhotoDisplay = document.querySelector(
  ".popup_type_photo-closeup"
);
const popupCloseupPhotoCloseButton = popupCloseupPhotoDisplay.querySelector(
  ".popup__close-button"
);
const photoCloseupLink = popupCloseupPhotoDisplay.querySelector(
  ".popup__closeup-photo"
);
const photoCloseupName = popupCloseupPhotoDisplay.querySelector(
  ".popup__closeup-location"
);

const openImagePopup = (cardInfo) => {
  photoCloseupLink.src = cardInfo.link;
  photoCloseupLink.alt = cardInfo.name;
  photoCloseupName.textContent = cardInfo.name;
  openPopup(popupCloseupPhotoDisplay);
};

function openEditProfilePopup() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

const displayCard = (cardElement) => {
  cardsDisplay.prepend(cardElement);
};

initialCards.forEach((card) => {
  displayCard(
    createCardElement(card, handleDelete, handleLike, openImagePopup)
  );
});

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const name = placeInput.value;
  const link = linkInput.value;

  const cardInfo = {
    name,
    link,
  };

  displayCard(
    createCardElement(cardInfo, handleDelete, handleLike, openImagePopup)
  );
  closePopup(popupAddCardDisplay);
  cardForm.reset();
};

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

buttonEditProfilePopupClose.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

buttonEditProfile.addEventListener("click", openEditProfilePopup);

buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCardDisplay);
});

buttonAddCardClose.addEventListener("click", () => {
  closePopup(popupAddCardDisplay);
});

cardForm.addEventListener("submit", handleAddCardSubmit);

popupCloseupPhotoCloseButton.addEventListener("click", () => {
  closePopup(popupCloseupPhotoDisplay);
});
