import React, { createContext, useContext, useState } from 'react';
import { RecommendationResult } from '../data/needsEngine';

export interface NeedsTransferPayload {
  needId: string | null;
  followUpId: string | null;
  customChallengeText: string;
  additionalNotes: string;
  recommendation: RecommendationResult | null;
}

interface NeedsContextValue {
  payload: NeedsTransferPayload;
  setPayload: React.Dispatch<React.SetStateAction<NeedsTransferPayload>>;
  clearPayload: () => void;
}

const INITIAL_PAYLOAD: NeedsTransferPayload = {
  needId: null,
  followUpId: null,
  customChallengeText: '',
  additionalNotes: '',
  recommendation: null,
};

const NeedsContext = createContext<NeedsContextValue | null>(null);

export const NeedsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [payload, setPayload] = useState<NeedsTransferPayload>(INITIAL_PAYLOAD);

  const clearPayload = () => {
    setPayload(INITIAL_PAYLOAD);
  };

  return (
    <NeedsContext.Provider value={{ payload, setPayload, clearPayload }}>
      {children}
    </NeedsContext.Provider>
  );
};

export function useNeeds(): NeedsContextValue {
  const ctx = useContext(NeedsContext);
  if (!ctx) {
    throw new Error('useNeeds must be used inside NeedsProvider');
  }
  return ctx;
}
