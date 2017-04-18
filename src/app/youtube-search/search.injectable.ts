import {
    SearchService,
    API_KEY,
    API_URL
} from './search.service';

export const SearchInjectables: Array<any> = [
    { provide: SearchService, useClass: SearchService },
    { provide: API_KEY, useValue: API_KEY },
    { provide: API_URL, useValue: API_URL }
];