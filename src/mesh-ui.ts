import { First, Last, Change } from './parts/data';

setInterval(() => {
    Change("First", "xd");
    Change("Last", "xdd");
    console.log(`${First()} XD ${Last()}`);
}, 10);