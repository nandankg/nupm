import { createSlice } from "@reduxjs/toolkit";
import { AssetRegisterData } from "../../data/Data";

const AssetRegisterReducerSlice = createSlice({
  name: "addAssetRegister",
  initialState: {
    data: AssetRegisterData,
    loading: false,
    error: null,
  },
  reducers: {
    addAssetRegister: (state, action) => {
      try {
        // Validate payload
        if (!action.payload || typeof action.payload !== 'object') {
          state.error = 'Invalid data format';
          return;
        }
        
        // Check required fields
        const requiredFields = ['station', 'system', 'location'];
        const missingFields = requiredFields.filter(field => !action.payload[field]);
        
        if (missingFields.length > 0) {
          state.error = `Missing required fields: ${missingFields.join(', ')}`;
          return;
        }
        
        // Add unique ID and timestamp
        const newEntry = {
          ...action.payload,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        
        state.data.push(newEntry);
        state.error = null;
        
        console.log('Asset Register entry added successfully:', newEntry);
      } catch (error) {
        state.error = error.message || 'Failed to add Asset Register entry';
        console.error('Error in addAssetRegister reducer:', error);
      }
    },
    clearAssetRegisterError: (state) => {
      state.error = null;
    },
  },
});

export const { addAssetRegister, clearAssetRegisterError } = AssetRegisterReducerSlice.actions;
export default AssetRegisterReducerSlice.reducer;
