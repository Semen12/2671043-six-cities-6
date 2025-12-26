
import { store } from '../store';

// State — это тип, который описывает всю структуру твоего хранилища
export type State = ReturnType<typeof store.getState>;
// AppDispatch — это тип для функции dispatch (чтобы отправлять действия)
export type AppDispatch = typeof store.dispatch;
