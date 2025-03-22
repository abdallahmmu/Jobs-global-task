import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  standalone: true,
  pure:true
})
export class DateAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return 'Unknown date';

    let date: Date;

    if (typeof value === 'string') {
      const normalizedDate = value.replace(/\.\d{6}Z$/, 'Z');
      date = new Date(normalizedDate);
    } else {
      date = value;
    }

    if (isNaN(date.getTime())) return 'Invalid date';

    const now = new Date();
    const difference = now.getTime() - date.getTime();

    const seconds = Math.floor(difference / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} days ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} weeks ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;

    const years = Math.floor(days / 365);
    return `${years} years ago`;
  }
}
