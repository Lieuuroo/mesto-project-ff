import "./pages/index.css";
import { initialCards } from "./components/initialCards";
import { createCardElement, handleDelete, handleLike } from "./components/card";
import { openPopup, closePopup } from "./components/popup";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupDisplay = document.querySelector(".popup_type_edit-profile");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const buttonClosePopup = document.querySelector(".popup__close-button");
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

function openEditProfilePopup() {
  openPopup(popupDisplay);
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupDisplay);
}

const displayCards = (cardElement) => {
  cardsDisplay.prepend(cardElement);
};

initialCards.forEach((card) => {
  displayCards(createCardElement(card));
});

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const name = placeInput.value;
  const link = linkInput.value;

  const cardInfo = {
    name,
    link,
  };

  displayCards(createCardElement(cardInfo));
  closePopup(popupAddCardDisplay);
};

formEditProfile.addEventListener("submit", submitEditProfileForm);

buttonClosePopup.addEventListener("click", () => {
  closePopup(popupDisplay);
});

buttonEditProfile.addEventListener("click", openEditProfilePopup);

buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCardDisplay);
  cardForm.reset();
});

buttonAddCardClose.addEventListener("click", () => {
  closePopup(popupAddCardDisplay);
});

cardForm.addEventListener("submit", handleAddCardSubmit);

popupCloseupPhotoCloseButton.addEventListener("click", () => {
  closePopup(popupCloseupPhotoDisplay);
});
