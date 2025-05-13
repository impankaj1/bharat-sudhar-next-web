import { create } from "zustand";

interface User {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  state?: string;
  district?: string;
}

interface Report {
  title?: string;
  description?: string;
  category?: string;
  subcategory?: string;
  state?: string;
  district?: string;
  location?: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

interface ReportIssuesState {
  reports: Report[];
  setReport: (report: Report) => void;
  deleteReport: (index: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export const useReportStore = create<ReportIssuesState>((set) => ({
  reports: [],
  setReport: (report) =>
    set((state) => ({
      reports: [report, ...state.reports],
    })),
  deleteReport: (index) =>
    set((state) => ({
      reports: state.reports.filter((_, i) => i !== index),
    })),
}));
