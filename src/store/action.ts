import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
// Создаем действие для смены города
// <string> означает, что вместе с действием мы будем передавать строку (название города)
export const changeCity = createAction<string>('city/changeCity');

// Создаем действие для заполнения списка предложений
export const fillOffers = createAction<Offer[]>('offers/fillOffers');
