import { createSelector } from '@reduxjs/toolkit';

export const getUser = (state: any) => state?.userData?.user?.details;