import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
//   content?: React.ReactNode;
}

const initialState: ModalState = {
  isOpen: false,
//   content: null,
};

export const openModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<React.ReactNode | undefined>) => {
      state.isOpen = true;
    //   if (action.payload) {
    //     state.content = action.payload;
    //   }
    },
    closeModal: (state) => {
      state.isOpen = false;
    //   state.content = null;
    },
  },
});

export const { openModal, closeModal } = openModalSlice.actions;

export default openModalSlice.reducer;
