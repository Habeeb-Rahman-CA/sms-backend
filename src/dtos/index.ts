// Folder placeholder for Data Transfer Objects (DTOs)
export class BaseResponseDto<T> {
  success: boolean;
  message: string;
  data?: T;
}
