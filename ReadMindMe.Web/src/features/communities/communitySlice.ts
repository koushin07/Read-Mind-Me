import { createSlice } from "@reduxjs/toolkit";
import { Community } from "./types/community";

const initialState = {
    communities: [] as Community[],
    filteredCommunity: [] as Community[],
    isLoading: false,
    error: '',
    currentCommunity: null as Community | null
}

const communitySlice = createSlice({
    name: 'communities',
    initialState,
    reducers: {
        setCommunities: (state, action) => {
            state.communities = action.payload
            state.filteredCommunity = action.payload
        },
        addCommunities: (state, action) => {
            state.communities.push(...action.payload)

            state.filteredCommunity.push(...action.payload)
        },
        addTemporaryCommunity: (state, action) => {
            // Add temporary community to the state
            state.communities.push(action.payload);
        },
        updateCommunity: (state, action) => {
            // Replace temporary community with the saved one
            state.communities = state.communities.map((community) =>
                community.id === action.payload.tempId ? action.payload.savedCommunity : community
            );
            state.filteredCommunity = state.communities
        },
        removeTemporaryCommunity: (state, action) => {
            // Remove temporary community in case of error
            state.communities = state.communities.filter(
                (community) => community.id !== action.payload
            );
            state.filteredCommunity = state.communities
        },
        setCurrentCommunity: (state, action) => {
            state.currentCommunity = action.payload
        },
        removeTempCurrentCommunity: (state, action) => {
            if (state.currentCommunity?.id === action.payload) {
                state.currentCommunity = null; // Or revert to the previous state
            }
        },
        removeCommunity: (state, action) => {
            state.communities = state.communities.filter(c => c.id !== action.payload)
            state.filteredCommunity = state.communities
        },
        setIsloading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            // Set error message
            state.error = action.payload;
        },
        setFilteredCommunity: (state, action) => {
            const query: string = action.payload;
            if (query.trim() !== '') {
                state.filteredCommunity = state.communities.filter((community) =>
                    community.name.toLowerCase().includes(query.toLowerCase()));

            }
        },

    }
})
export const {
    setCommunities,
    addTemporaryCommunity,
    updateCommunity,
    removeTemporaryCommunity,
    removeTempCurrentCommunity,
    addCommunities,
    setCurrentCommunity,
    removeCommunity,
    setIsloading,
    setError,
    setFilteredCommunity
} = communitySlice.actions
export default communitySlice.reducer
