import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import communityReducer from '@/features/communities/communitySlice'
import presenceReducer from '@/shared/presenceSlice'
import messageReducer from '@/features/messages/messageSlice'

import messageHubReducer from '@/features/messages/messageHubSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        communities: communityReducer,
        presence: presenceReducer,
        message: messageReducer,
        messageHub: messageHubReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
