
export type IssueStatus = 'pending' | 'in-progress' | 'resolved';

export type Authority = {
  id: string;
  name: string;
  position: string;
  department: string;
  contactInfo?: string;
  district: string;
  state: string;
  issuesSolved: number;
  issuesPending: number;
  profileImage?: string;
};

export type Issue = {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  location: string;
  state: string;
  district: string;
  status: IssueStatus;
  reportDate: string;
  votes: number;
  comments: number;
  image?: string;
  latitude?: number;
  longitude?: number;
  taggedAuthorities?: string[];
};
