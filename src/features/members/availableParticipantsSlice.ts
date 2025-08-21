// src/features/members/availableParticipantsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchData } from "../../api/fetcher"
import type { AvailableParticipantDTO } from "../../entities/AvailableParticipant"


export const fetchAvailableParticipants = createAsyncThunk<
  AvailableParticipantDTO[],
  string
>(
  "availableParticipants/fetch",
  async (surveyId) => {
    const raw = await fetchData<any[]>(
      `/members/by-not-participated-survey-and-active?surveyId=${surveyId}`
    )
    return raw.map((item) => ({
      memberId: item["Member Id"],
      fullName: item["Full name"],
      emailAddress: item["E-mail address"],
      isActive: item["Is Active"],
    }))
  }
)

interface AvailableParticipantsState {
  items: AvailableParticipantDTO[]
  loading: boolean
  error: string | null
}

const initialState: AvailableParticipantsState = {
  items: [],
  loading: false,
  error: null,
}

const availableParticipantsSlice = createSlice({
  name: "availableParticipants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableParticipants.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAvailableParticipants.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAvailableParticipants.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch"
      })
  },
})

export default availableParticipantsSlice.reducer
