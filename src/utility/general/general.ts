import { HttpException, HttpStatus } from '@nestjs/common';

export function getIdsFromString(ids: string, name?: string): string {
  try {
    const array = ids.split(',').map((elem) => elem.trim());
    const filteredArray = array.filter((elem) => {
      if (!isNaN(Number(elem)) && elem.trim()) {
        return true;
      }
      return false;
    });

    if (filteredArray.length === 1) {
      return filteredArray[0];
    }

    const uniqueArray = new Set(filteredArray);

    return Array.from(uniqueArray).join(',');
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
  if (Number(query)) {
    return Number(query);
  }

  let message: string;

  if (name) {
    message = `Wrong filter format of ${name}`;
  } else {
    message = `Wrong filter format`;
  }
  throw new HttpException(message, HttpStatus.BAD_REQUEST);
}
