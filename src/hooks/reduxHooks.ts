import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

//hook personalizado para hacer llamadas a la api
export const useAppDispatch = () => useDispatch<AppDispatch>();
//hook personalizado para almacenar los datos de la api
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
