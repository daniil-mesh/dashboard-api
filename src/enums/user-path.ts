export const UserPath = {
  Info: '/info',
  Login: '/login',
  Register: '/register',
} as const;

export type UserPath = (typeof UserPath)[keyof typeof UserPath];
