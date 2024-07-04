import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { CartSlice, createCartSlice } from './cart-slice';





export const useStore = create<CartSlice>()(
	devtools(
		persist(
			subscribeWithSelector(
				immer((...a) => ({
					...createCartSlice(...a),
				}))
			),
			{
				name: 'local-storage',
			}
		)
	)
);
