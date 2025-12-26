import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { DetailedOffer, Offer } from '../types/offer';
import { AuthData, UserData } from '../types/auth-data';
import { Review, ReviewData } from '../types/review';
import { APIRoute } from '../const';
import { saveToken, dropToken } from '../services/token';
import { setError } from './app-process/app-process';
import { setUser } from './user-process/user-process';

type DetailMessageType = {
  errorType: string;
  message: string;
  details?: {
    property: string;
    value: string;
    messages: string[];
  }[];
};

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  (_arg, { dispatch }) => {
    setTimeout(() => dispatch(setError(null)), 2000);
  }
);

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  return data;
});

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  } catch (error) {
    dropToken();
    dispatch(setUser(null));
    throw error;
  }
});



export const fetchOfferDataAction = createAsyncThunk<
  { offer: DetailedOffer; nearby: Offer[]; comments: Review[] },
  string,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/fetchOfferData', async (offerId, { extra: api }) => {
  const [offerResponse, nearbyResponse, commentsResponse] = await Promise.all([
    api.get<DetailedOffer>(`${APIRoute.Offers}/${offerId}`),
    api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`),
    api.get<Review[]>(`${APIRoute.Comments}/${offerId}`),
  ]);

  return {
    offer: offerResponse.data,
    nearby: nearbyResponse.data,
    comments: commentsResponse.data,
  };
});

export const postCommentAction = createAsyncThunk<
  Review[],
  ReviewData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>(
  'user/postComment',
  async ({ offerId, comment, rating }, { extra: api, rejectWithValue }) => {
    try {
      await api.post<Review>(`${APIRoute.Comments}/${offerId}`, {
        comment,
        rating,
      });
      const { data } = await api.get<Review[]>(
        `${APIRoute.Comments}/${offerId}`
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<DetailMessageType>;
      return rejectWithValue(
        error.response?.data.message || 'Error posting comment'
      );
    }
  }
);

export const fetchFavoritesAction = createAsyncThunk<
  Offer[],
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/fetchFavorites', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Favorite);
  return data;
});

export const setFavoriteAction = createAsyncThunk<
  Offer,
  { offerId: string; status: number },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/setFavorite', async ({ offerId, status }, { extra: api }) => {
  // status: 1 - добавить, 0 - удалить
  const { data } = await api.post<Offer>(
    `${APIRoute.Favorite}/${offerId}/${status}`
  );
  return data;
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, {
        email,
        password,
      });
      saveToken(data.token);

      dispatch(setError(null));

      dispatch(fetchOffersAction());

      dispatch(fetchFavoritesAction());
      return data;
    } catch (err) {
      const error = err as AxiosError<DetailMessageType>;
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.details && errorData.details.length > 0) {
          dispatch(setError(errorData.details[0].messages[0]));
        } else {
          dispatch(setError(errorData.message));
        }
        dispatch(clearErrorAction());
      }
      throw err;
    }
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();

  dispatch(fetchOffersAction());
});
