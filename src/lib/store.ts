import { User } from "@/types/user";
import { create } from "zustand";
import Cookies from "js-cookie";

interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
}

interface ReportIssuesState {
  reports: Report[];
  setReport: (report: Report) => void;
  deleteReport: (index: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => {
    // Store token in cookie with 7 days expiry
    Cookies.set("auth_token", token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    set({ user, token });
  },
  clearUser: () => {
    // Remove token from cookie
    Cookies.remove("auth_token");
    set({ user: null, token: null });
  },
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
