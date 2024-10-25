import { Router } from 'express';

export default interface IController {
  readonly router: Router;

  readonly path: string;
}
