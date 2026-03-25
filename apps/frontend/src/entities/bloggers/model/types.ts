export type BloggerNote = {
  _id: string;
  date: string;
  text: string;
};

export type Blogger = {
  _id: string;
  photoLink: string;
  notes: BloggerNote[];
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
  other: Blogger[];
};
