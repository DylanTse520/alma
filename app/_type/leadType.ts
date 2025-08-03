export type Lead = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  status: "PENDING" | "REACHED_OUT";
  country: string;
};
