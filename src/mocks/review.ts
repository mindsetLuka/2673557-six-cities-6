export type ReviewType = {
    id: string;
    userName: string;
    avatarUrl: string;
    rating: number;
    comment: string;
    date: string;
};

export const mockReviews: ReviewType[] = [
  {
    id: 'r1',
    userName: 'Max',
    avatarUrl: 'img/avatar-max.jpg',
    rating: 4,
    comment: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam.',
    date: '2019-04-24'
  },
  {
    id: 'r2',
    userName: 'Angelina',
    avatarUrl: 'img/avatar-angelina.jpg',
    rating: 5,
    comment: 'Really enjoyed the stay, excellent host and location.',
    date: '2020-06-12'
  },
  {
    id: 'r3',
    userName: 'Sam',
    avatarUrl: 'img/avatar-max.jpg',
    rating: 3.5,
    comment: 'Nice place but a bit noisy at night.',
    date: '2021-01-05'
  }
];
