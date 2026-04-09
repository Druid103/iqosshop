import { createSlice } from '@reduxjs/toolkit';
import type { IcosT } from '../model/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  addIcosThunk,
  deleteIcosThunk,
  fetchIcossThunk,
  basketIcosThunk,
  searchIcossThunk,
  updateIcosThunk,
} from './thunks';

export type IcosState = {
  icoss: IcosT[];
  filtIcosBD: IcosT[];
  loading: boolean;
  sort: {
    key: 'name';
    order: 'asc' | 'desc';
  };
  selectedIcos: IcosT | null;
  basketIcos: IcosT[];
};

const initialState: IcosState = {
  icoss: [],
  filtIcosBD: [],
  loading: false,
  sort: {
    key: 'name',
    order: 'asc',
  },
  selectedIcos: null,
  basketIcos: [],
};

export const icossSlice = createSlice({
  name: 'icoss',
  initialState,
  reducers: {
    sortByTitle: (state) => {
      const { key, order } = state.sort;
      state.icoss.sort((a, b) =>
        order === 'asc'
          ? (a[key] ?? '').localeCompare(b[key] ?? '')
          : (b[key] ?? '').localeCompare(a[key] ?? ''),
      );
      state.sort.order = order === 'asc' ? 'desc' : 'asc';
    },
    
    setSelected: (state, action: PayloadAction<IcosT | null>) => {
      state.selectedIcos = action.payload;
    },
    basketIcos: (state, action: PayloadAction<IcosT>) => {
      const basketIndex = state.basketIcos.findIndex((b) => b.id === action.payload.id);
      if (basketIndex !== -1) {
        state.basketIcos.splice(basketIndex, 1);
      } else {
        state.basketIcos.push(action.payload);
      }
    },
    searchIcossFilterBD: (state, action: PayloadAction<string>) => {
      state.filtIcosBD = state.icoss.filter((icos) =>
        (icos.name ?? '').toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    clearFilteredIcoss: (state) => {
      state.filtIcosBD = [];
    },
    removeDuplicateIcoss: (state) => {
      const seenIds = new Set();
      state.icoss = state.icoss.filter((icos) => {
        if (seenIds.has(icos.id)) {
          return false;
        }
        seenIds.add(icos.id);
        return true;
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIcossThunk.pending, (state) => {
        state.loading = true;
      })
   
      .addCase(fetchIcossThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addIcosThunk.fulfilled, (state, action) => {
        const existingIcos = state.icoss.find((icos) => icos.id === action.payload.id);
        if (!existingIcos) {
          state.icoss.unshift(action.payload);
        }
      })
      .addCase(deleteIcosThunk.fulfilled, (state, action) => {
        state.icoss = state.icoss.filter((icos) => icos.id !== action.payload);
        state.basketIcos = state.basketIcos.filter((icos) => icos.id !== action.payload);
      })
      .addCase(updateIcosThunk.fulfilled, (state, action) => {
        state.icoss = state.icoss.map((icos) =>
          icos.id === action.payload.id ? action.payload.res : icos,
        );
        state.basketIcos = state.basketIcos.map((icos) =>
          icos.id === action.payload.id ? action.payload.res : icos,
        );
      })
  },
});

export const {
  sortByTitle,
 
  
  
  setSelected,
  basketIcos,
  searchIcossFilterBD,
  clearFilteredIcoss,
  removeDuplicateIcoss,
} = icossSlice.actions;

export const icossReducer = icossSlice.reducer;