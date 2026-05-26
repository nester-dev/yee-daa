export type BloggerNoteType = {
  _id: string;
  date: string;
  text: string;
};

export type Blogger = {
  _id: string;
  photoLink: string;
  notes: BloggerNoteType[];
  subscribersCount: number;
  newRecipesCount: number;
  login: string;
  firstName: string;
  lastName: string;
  isFavorite: boolean;
  bookmarksCount: number;
};

export type GetBloggersResponse = {
  favorites: Blogger[];
  others: Blogger[];
};

export type GetBloggerByIdResponse = {
  bloggerInfo: Blogger;
  isFavorite: boolean;
  totalBookmarks: number;
  totalSubscribers: number;
};
