// Folder placeholder for Custom Helper functions and utility classes
export class StringHelper {
  static capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export * from './crypto.helper';

