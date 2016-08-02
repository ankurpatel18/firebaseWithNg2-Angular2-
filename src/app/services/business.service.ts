import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class MyBusinessService {
    businesses: FirebaseListObservable<any[]>;
    categories: FirebaseListObservable<any[]>;

    constructor(private _af: AngularFire) {

    }

    getBusinesses(category = '0') {
        if (category !== '0') {
            this.businesses = this._af.database.list('/businesses',{
                query: {
                    orderByChild: 'category',
                    equalTo: category
                }
            }) as FirebaseListObservable<any[]>;
        } else {
            this.businesses = this._af.database.list('/businesses') as FirebaseListObservable<any[]>;
        }
        return this.businesses;
    }

    getCategories() {
        this.categories = this._af.database.list('/categories') as FirebaseListObservable<any[]>;
        return this.categories;
    }

    addBusiness(business): Promise<any> {
        return this.businesses.push(business);
    }
    updateBusiness(business, key): Promise<any> {
        return this.businesses.update(key, business);
    }
    removeBusiness(key): Promise<any> {
        return this.businesses.remove(key);
    }
}