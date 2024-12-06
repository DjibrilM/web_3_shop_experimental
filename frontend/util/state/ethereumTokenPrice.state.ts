import { create } from 'zustand'
import { Coin } from '../types/ethereumToken'
import { EMPTY_COIN } from './DEFAULT';


interface Action {
    updateToken:(token:Coin)=> void
}

export const useEthereumStateStore = create<{ coin: Coin } & Action>((set) => ({
    coin: EMPTY_COIN,
    updateToken:(coin)=> set({coin:coin}),
}));

export default useEthereumStateStore;