import "./pages/index.css";
import { createCardElement, handleDelete, handleLike } from "./components/card";
import { openPopup, closePopup } from "./components/popup";
import { enableValidation, clearValidation } from "./components/validation";
import {
  updateProfile,
  addNewCard,
  currentUserData,
  getInitialCards,
  updateAvatar,
} from "./components/api";

let profileId;
const cardsDisplay = document.querySelector(".cards");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileCloseButton = popupEditProfile.querySelector(
  ".popup__close-button"
);
const popupEditProfileSaveButton = popupEditProfile.querySelector(
  ".popup__form-save-button"
);
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfileForm = document.querySelector(
  ".popup__form-imput-container_type_edit-profile"
);
const nameInput = popupEditProfileForm.querySelector(
  ".popup__form-item_el_name"
);
const jobInput = popupEditProfileForm.querySelector(".popup__form-item_el_job");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
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
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupAddCardSaveButton = popupAddCard.querySelector(
  ".popup__form-save-button"
);
const popupAddCardCloseButton = popupAddCard.querySelector(
  ".popup__close-button"
);
const buttonAddCard = document.querySelector(".profile__add-button");
const popupAddCardForm = document.querySelector(
  ".popup__form-imput-container_type_add-card"
);
const placeInput = popupAddCardForm.querySelector(".popup__form-item_el_place");
const linkInput = popupAddCardForm.querySelector(".popup__form-item_el_link");
const popupEditAvatar = document.querySelector(".popup_type_change-avatar");
const popupEditAvatarSaveButton = popupEditAvatar.querySelector(
  ".popup__form-save-button"
);
const popupEditAvatarCloseButton = popupEditAvatar.querySelector(
  ".popup__close-button"
);
const avatarPhoto = document.querySelector(".profile__avatar");
const avatarStyle = avatarPhoto.style;
const popupEditAvatarForm = document.querySelector(
  ".popup__form-imput-container_type_update-avatar"
);
const avatarLink = popupEditAvatarForm.querySelector(
  ".popup__form-item_el_link"
);

const validationConfig = {
  formSelector: ".popup__form-imput-container",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__form-save-button",
  inactiveButtonClass: "popup__form-save-button_disabled",
  inputErrorClass: "popup__form-item_invalid",
  errorClass: "popup__form-error-message_active",
};

function addCard(cardInfo, profileId) {
  const newCard = createCardElement(
    cardInfo,
    handleDelete,
    handleLike,
    openImagePopup,
    profileId
  );

  cardsDisplay.prepend(newCard);

  return newCard;
}

Promise.all([currentUserData(), getInitialCards()])
  .then(([profile, cards]) => {
    profileId = profile._id;
    const newAvatarUrl = profile.avatar;
    profileName.textContent = profile.name;
    profileSubtitle.textContent = profile.about;

    avatarStyle.backgroundImage = `url('${newAvatarUrl}')`;

    cards.reverse().forEach((card) => {
      addCard(card, profileId);
    });
  })
  .catch((err) => {
    console.log(err);
  });

popupAddCardCloseButton.addEventListener("click", () =>
  closePopup(popupAddCard)
);
popupAddCard.addEventListener("submit", () => closePopup(popupAddCard));
buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  popupAddCardForm.reset();
});
popupEditProfileCloseButton.addEventListener("click", () =>
  closePopup(popupEditProfile)
);
popupEditProfile.addEventListener("submit", () => closePopup(popupEditProfile));
buttonEditProfile.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;

  clearValidation(popupEditProfile, validationConfig);
  openPopup(popupEditProfile);
});
popupEditAvatarCloseButton.addEventListener("click", () =>
  closePopup(popupEditAvatar)
);
popupEditAvatar.addEventListener("submit", () => closePopup(popupEditAvatar));
avatarPhoto.addEventListener("click", () => openPopup(popupEditAvatar));

const openImagePopup = (cardInfo) => {
  photoCloseupLink.src = cardInfo.link;
  photoCloseupLink.alt = cardInfo.name;
  photoCloseupName.textContent = cardInfo.name;
  openPopup(popupCloseupPhotoDisplay);
};

popupCloseupPhotoCloseButton.addEventListener("click", () => {
  closePopup(popupCloseupPhotoDisplay);
});

function editAvatar(evt) {
  evt.preventDefault();

  popupEditAvatarSaveButton.textContent = "Сохранение...";

  updateAvatar(avatarLink.value)
    .then((res) => {
      avatarStyle.backgroundImage = `url('${res.avatar}')`;
    })
    .finally(() => {
      popupEditAvatarSaveButton.textContent = "Cохранить";
    })
    .catch((err) => {
      console.log(err);
    });
  popupEditAvatarForm.reset();
}

popupEditAvatarForm.addEventListener("submit", editAvatar);

function editProfile(evt) {
  evt.preventDefault();

  popupEditProfileSaveButton.textContent = "Сохранение...";

  updateProfile(nameInput.value, jobInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileSubtitle.textContent = jobInput.value;
    })
    .finally(() => {
      popupEditProfileSaveButton.textContent = "Cохранить";
    })
    .catch((err) => {
      console.log(err);
    });
}

popupEditProfile.addEventListener("submit", editProfile);

function handleAddSubmit(evt) {
  evt.preventDefault();

  popupAddCardSaveButton.textContent = "Сохранение...";

  addNewCard(placeInput.value, linkInput.value)
    .then((card) => {
      addCard(card, profileId);
      popupAddCardForm.reset();
    })
    .finally(() => {
      popupAddCardSaveButton.textContent = "Cохранить";
    })
    .catch((err) => {
      console.log(err);
    });
}

popupAddCardForm.addEventListener("submit", handleAddSubmit, () => {
  clearValidation(popupAddCardForm, validationConfig);
});

enableValidation(validationConfig);
