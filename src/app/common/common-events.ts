import { BehaviorSubject } from "rxjs";

export const subscriptionLimitReached: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
export const subscriptionLimitReachedObserver = subscriptionLimitReached.asObservable();