const cardsTemplate = document.querySelector("#cards").content;

export const createCardElement = (
  cardInfo,
  handleDelete,
  handleLike,
  openImagePopup
) => {
  const cardElement = cardsTemplate
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

  deleteButton.addEventListener("click", handleDelete);

  likeButton.addEventListener("click", handleLike);

  closeupButton.addEventListener("click", () => {
    openImagePopup(cardInfo);
  });

  return cardElement;
};

export const handleDelete = (evt) => {
  const evtTarget = evt.target.closest(".cards__item");
  evtTarget.remove();
};

export const handleLike = (evt) => {
  evt.target.classList.toggle("cards__like-button_active");
};
