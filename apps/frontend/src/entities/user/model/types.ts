export type User = {
  _id: string;
  email: string;
  login: string;
  firstName: string;
  lastName: string;
  recipesIds: string[];
  drafts: [
    {
      _id: string;
      title: string;
      time: number;
    },
  ];
  subscriptions: string[];
  subscribers: string[];
};
