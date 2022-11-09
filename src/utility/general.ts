import { HttpException, HttpStatus } from '@nestjs/common';

export function getIdsFromString(ids: string, name?: string): number[] {
  try {
    const array = ids.split(',');

    return array.map((elem) => +elem).filter((elem) => elem);
  } catch (error) {
    let message: string;
    if (name) {
      message = `Wrong filter format of ${name}`;
    } else {
      message = 'Wrong filter format';
    }
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }
}

export function queryNumberCheck(query: string, name?: string): number {
  if (+query) {
    return +query;
  }

  let message: string;

  if (name) {
    message = `Wrong filter format of ${name}`;
  } else {
    message = `Wrong filter format`;
  }
  throw new HttpException(message, HttpStatus.BAD_REQUEST);
}
