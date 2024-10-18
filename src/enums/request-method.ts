export const RequestMethod = {
  Get: 'get',
  Post: 'post',
  Put: 'put',
  Delete: 'delete',
} as const;

export type RequestMethod = (typeof RequestMethod)[keyof typeof RequestMethod];
