import { openPopup } from "./popup";

const popupCloseupPhotoDisplay = document.querySelector(
  ".popup_type_photo-closeup"
);
const photoCloseupLink = popupCloseupPhotoDisplay.querySelector(
  ".popup__closeup-photo"
);
const photoCloseupName = popupCloseupPhotoDisplay.querySelector(
  ".popup__closeup-location"
);

const fillPhotoCloseupPopup = (cardInfo) => {
  photoCloseupLink.src = cardInfo.link;
  photoCloseupLink.alt = cardInfo.name;
  photoCloseupName.textContent = cardInfo.name;
};

export const createCardElement = (cardInfo) => {
  const cardsTemplate = document.querySelector("#cards");
  const cardElement = cardsTemplate.content
    .querySelector(".cards__item")
    .cloneNode(true);

  const cardPhoto = cardElement.querySelector(".cards__photo");
  const cardPlace = cardElement.querySelector(".cards__location-name");

  cardPhoto.src = cardInfo.link;
  cardPhoto.alt = cardInfo.name;
  cardPlace.textContent = cardInfo.name;

  const deleteButton = cardElement.querySelector(".cards__delete-button");
  const likeButton = cardElement.querySelector(".cards__like-button");
  const closeupButton = cardElement.querySelector(".cards__closeup-button");

  const handleDelete = () => {
    cardElement.remove();
  };

  const handleLike = () => {
    likeButton.classList.toggle("cards__like-button_active");
  };

  deleteButton.addEventListener("click", handleDelete);

  likeButton.addEventListener("click", handleLike);

  closeupButton.addEventListener("click", () => {
    openPopup(popupCloseupPhotoDisplay);
    fillPhotoCloseupPopup(cardInfo);
  });

  return cardElement;
};
