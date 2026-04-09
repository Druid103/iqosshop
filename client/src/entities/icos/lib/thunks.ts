import { createAsyncThunk } from '@reduxjs/toolkit';
import icosService from '../api/service';
import { addIcosSchema } from '../model/schema';
import { ZodError } from 'zod';
import type { IcosT } from '../model/types';

export const fetchIcossThunk = createAsyncThunk('icoss/fetchIcossThunk', () =>
  icosService.getIcoss(),
);

export const addIcosThunk = createAsyncThunk('icoss/addIcosThunk', async (formData: FormData) => {
  try {
    const formDataObj: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        formDataObj[key] = value;
      }
    });
    const validData = addIcosSchema.parse(formDataObj);
    return await icosService.createIcos(validData);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue) => issue.message).join(', ');
      throw new Error(`Ошибка валидации: ${errorMessages}`);
    }
    throw error;
  }
});

export const deleteIcosThunk = createAsyncThunk(
  'icoss/deleteIcosThunk',
  async (icossId: IcosT['id']) => {
    await icosService.deleteIcosById(icossId);
    return icossId;
  },
);

export const updateIcosThunk = createAsyncThunk(
  'icoss/updateIcosThunk',
  async ({ id, formData }: { id: number; formData: FormData }) => {
    const data = addIcosSchema.parse(Object.fromEntries(formData));
    const res = await icosService.updateIcosById(id, data);
    return { res, id };
  },
);

export const searchIcossThunk = createAsyncThunk(
  'icoss/searchIcossThunk',
  async (input: string) => {
    const icoss = await icosService.searchIcosByTitle(input);
    return icoss;
  },
);

export const basketIcosThunk = createAsyncThunk('icoss/basketIcosThunk', async () => {
  const res = await icosService.basketIcos();
  return res;
});

