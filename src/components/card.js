import { deleteCard, addLike, removeLike } from "./api";

const cardsTemplate = document.querySelector("#cards").content;

const createCardElement = (
  cardInfo,
  handleDelete,
  handleLike,
  openImagePopup,
  profileId
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

  const hasLike = cardInfo.likes.some((like) => {
    return like._id === profileId;
  });

  if (hasLike) {
    likeButton.classList.add("cards__like-button_active");
  }

  const countLike = cardElement.querySelector(".cards__like-count");

  countLike.textContent = cardInfo.likes.length;

  if (cardInfo.owner._id === profileId) {
    deleteButton.addEventListener("click", (evt) => {
      handleDelete(evt, cardInfo._id);
    });
  } else {
    deleteButton.classList.add("cards__delete-button-hide");
  }

  likeButton.addEventListener("click", (evt) => {
    handleLike(evt, cardInfo._id, countLike);
  });

  closeupButton.addEventListener("click", () => {
    openImagePopup(cardInfo);
  });

  return cardElement;
};

const handleDelete = (evt, cardID) => {
  deleteCard(cardID)
  .then(() => evt.target.closest(".cards__item").remove())
  .catch((err) => console.log(err));
};

const handleLike = (evt, cardID, countLike) => {
  const isLiked = evt.target.classList.contains("cards__like-button_active");
  const likeMethod = isLiked ? removeLike : addLike;
  likeMethod(cardID)
    .then((res) => {
      countLike.textContent = res.likes.length;
      evt.target.classList.toggle("cards__like-button_active");
    })
    .catch((err) => console.log(err));
};

export { createCardElement, handleDelete, handleLike };