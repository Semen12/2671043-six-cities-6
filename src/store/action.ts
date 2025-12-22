import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { SortOption } from '../const';
// Создаем действие для смены города
// <string> означает, что вместе с действием мы будем передавать строку (название города)
export const changeCity = createAction<string>('city/changeCity');

// Создаем действие для заполнения списка предложений
export const loadOffers = createAction<Offer[]>('offers/loadOffers');

// Создаем действие для смены сортировки
export const changeSort = createAction<SortOption>('offers/changeSort');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
