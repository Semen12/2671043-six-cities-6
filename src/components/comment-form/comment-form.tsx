import { useState, ChangeEvent, Fragment } from 'react';
import { RatingMap, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH } from '../../const';

export const CommentForm = () => {
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    // Парсим рейтинг, если изменилось поле rating, иначе берем строковое значение
    const parsedValue = name === 'rating' ? Number(value) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {/* Используем Object.entries для перебора константы */}
        {/* reverse() нужен, если ключи отсортировались как 1,2,3... а нам нужно 5,4,3... */}
        {Object.entries(RatingMap).reverse().map(([score, title]) => (
          <Fragment key={score}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={score}
              id={`${score}-stars`}
              type="radio"
              onChange={handleFormChange}
              checked={formData.rating === Number(score)}
            />
            <label
              htmlFor={`${score}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFormChange}
        value={formData.review}
        maxLength={MAX_COMMENT_LENGTH}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          // Кнопка заблокирована, если нет рейтинга ИЛИ текст слишком короткий
          disabled={formData.rating === 0 || formData.review.length < MIN_COMMENT_LENGTH}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
