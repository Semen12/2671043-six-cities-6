import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus } from '../const';
import { DetailedOffer, Offer } from '../types/offer';
import {
  setOffersDataLoadingStatus,
  loadOffers,
  requireAuthorization,
  setError,
  setUser,
  setOfferLoadingStatus,
  loadOffer,
  loadNearbyOffers,
  loadComments,
  setOfferNotFound,
} from './action';
import { AuthData, UserData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { Review, ReviewData } from '../types/review';

type DetailMessageType = {
  errorType: string;
  message: string;
  details?: {
    property: string;
    value: string;
    messages: string[];
  }[];
};

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  dispatch(loadOffers(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  (_arg, { dispatch }) => {
    setTimeout(() => dispatch(setError(null)), 2000);
  }
);

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, {
        email,
        password,
      });

      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser(data));
      dispatch(setError(null));
    } catch (err) {
      const error = err as AxiosError<DetailMessageType>;

      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (errorData.details && errorData.details.length > 0) {
          const detailMessage = errorData.details[0].messages[0];
          dispatch(setError(detailMessage));
        } else {
          dispatch(setError(errorData.message));
        }

        dispatch(clearErrorAction());
      }
    }
  }
);

export const checkUserAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);

    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
  }
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  dispatch(setUser(null));
});

export const fetchOfferDataAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOfferData', async (offerId, { dispatch, extra: api }) => {
  dispatch(setOfferLoadingStatus(true));
  try {
    const [offerResponse, nearbyResponse, commentsResponse] = await Promise.all(
      [
        api.get<DetailedOffer>(`${APIRoute.Offers}/${offerId}`),
        api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`),
        api.get<Review[]>(`${APIRoute.Comments}/${offerId}`),
      ]
    );

    dispatch(loadOffer(offerResponse.data));
    dispatch(loadNearbyOffers(nearbyResponse.data));
    dispatch(loadComments(commentsResponse.data));
  } catch (err) {
    dispatch(setOfferNotFound(true));
  } finally {
    dispatch(setOfferLoadingStatus(false));
  }
});

export const postCommentAction = createAsyncThunk<
  void,
  ReviewData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectWithValue: string;
  }
  >(
    'user/postComment',
    async (
      { offerId, comment, rating },
      { dispatch, extra: api, rejectWithValue }
    ) => {
      try {
        const response = await api.post<Review>(
          `${APIRoute.Comments}/${offerId}`,
          {
            comment,
            rating,
          }
        );
        if (response.status === 201) {
          const { data } = await api.get<Review[]>(
            `${APIRoute.Comments}/${offerId}`
          );
          dispatch(loadComments(data));
        }
      } catch (err) {
        const error = err as AxiosError<DetailMessageType>;
        return rejectWithValue(error.response?.data.message);
      }
    }
  );
