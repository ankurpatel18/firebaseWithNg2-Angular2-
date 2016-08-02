import { Component, OnInit } from '@angular/core';
// import { FirebaseListObservable  } from 'angularfire2';
import { MyBusinessService } from './services/business.service';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [MyBusinessService]
})

export class AppComponent implements OnInit{
  title = 'businesscontacts works!';
  businesses: any;
  categories: any;
  appState: string;
  activeKey: string;

  selected_company: string;
  selected_yrs: string;
  selected_category: string;
  selected_description: string;
  selected_phone: string;
  selected_email: string;
  selected_street: string;
  selected_city: string;
  selected_state: string;
  selected_zipcode: string;

  constructor(private _bs: MyBusinessService) {
  }

  ngOnInit(){
    this.appState = 'default';
    this._bs.getBusinesses().subscribe(business => {
      this.businesses = business;
    });

     this._bs.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  // Change the state of application 
  changeState(state, key = null) {
    if (key != null) {
      this.activeKey = key;
    }
    this.appState = state;
  }

  filtercategory(category){
    this._bs.getBusinesses(category).subscribe(business => {
      this.businesses = business;
    });
  }


  // Addding Business
  addBusiness( company, yrs, category, description, phone, email, street, city, state, zipcode) {
    let created_at = new Date().toString();
    let newBusiness = {
      company: company,
      years_in_business: yrs,
      category: category,
      description: description,
      phone: phone,
      email: email,
      street_address: street,
      city: city,
      state: state,
      zipcode: zipcode,
      createdAt: created_at
    };
    this._bs.addBusiness(newBusiness);
    this.goBack();
  }

  // Editing Business
  showEdit(business) {
    this.changeState('edit', business.$key);
    this.selected_company = business.company;
    this.selected_yrs = business.years_in_business;
    this.selected_category = business.category;
    this.selected_description = business.description;
    this.selected_phone = business.phone;
    this.selected_email = business.email;
    this.selected_street = business.street_address;
    this.selected_city = business.city;
    this.selected_state = business.state;
    this.selected_zipcode = business.zipcode;
  }
  updateBusiness() {
    let upBusiness = {
      company: this.selected_company,
      years_in_business: this.selected_yrs,
      category: this.selected_category,
      description: this.selected_description,
      phone: this.selected_phone,
      email: this.selected_email,
      street_address: this.selected_street,
      city: this.selected_city,
      state: this.selected_state,
      zipcode: this.selected_zipcode
    };
    this._bs.updateBusiness(upBusiness, this.activeKey);
     this.goBack();
  }

  // Removing Business
  removeBusiness(key) {
    this._bs.removeBusiness(key);
    this.goBack();
  }

  // Go Back to Default State
  goBack() {
    this.changeState('default');
  }
}
