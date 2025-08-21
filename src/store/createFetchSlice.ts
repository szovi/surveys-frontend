import { createAsyncThunk, createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { fetchData } from "../api/fetcher";


export interface FetchState<T> {
    items: T[]
    loading: boolean
    error: string | null
}

export function createFetchSlice<T>(name: string, endpoint: string) {

    const fetchThunk = createAsyncThunk<T[], void, { state: any }>(
        `${name}/fetchAll`,
        async (_, { getState }) => {
            const sliceState = getState()[name] as FetchState<T> | undefined;

            if (sliceState && sliceState.items.length > 0) {
                return sliceState.items;
            }

            return await fetchData<T[]>(endpoint);
        }
    );
    const initialState: FetchState<T> = {
        items: [],
        loading: false,
        error: null,
    };

    const slice = createSlice({
        name,
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchThunk.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchThunk.fulfilled, (state, action: PayloadAction<T[]>) => {
                    state.items = action.payload as unknown as typeof state.items;
                    state.loading = false;
                })
                .addCase(fetchThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || "Failed to fetch data";
                });
        }
    })

    return {
        reducer: slice.reducer,
        actions: slice.actions,
        fetchThunk,
    }
}