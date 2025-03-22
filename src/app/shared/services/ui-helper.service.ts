import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UiHelperService {

  constructor(private toastr: ToastrService) { }

  toastrSuccess(msg: string, title: string = '') {
    if (title != '') this.toastr.success(msg, title, {
      closeButton: true,
    });
    else this.toastr.success(msg);
  }

  toastrError(msg: string, title: string = '') {
    if (title != '') this.toastr.error(msg, title,{
      closeButton:true,
    });
    else this.toastr.error(msg);
  }

  toastrWarning(msg: string, title: string = '') {
    if (title != '') this.toastr.warning(msg, title,{
      closeButton:true
    });
    else this.toastr.warning(msg);
  }

  toastrInfo(msg: string, title: string = '') {
    if (title != '') this.toastr.info(msg, title,{
      closeButton:true
    });
    else this.toastr.info(msg);
  }

  setParam(key:string, value:any){ // set something to localstorage
    const JSONValue = JSON.stringify(value)
     localStorage.setItem(key,JSONValue)
  }

  getParam<T>(key:string) : T | null { //get somthing from localstorage based on the given type
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return null;

    try {
      return JSON.parse(storedValue);
    } catch (error) {
      return null;
    }

  }

  removeParam(key:string){ // remove something from localstorage
    localStorage.removeItem(key)
  }

  updatFormValues(form:FormGroup){
    Object.keys(form.controls).forEach((key) => {
      // Update each control value
      form.controls[key].setValue('');
      form.controls[key].markAsUntouched()
      form.controls[key].updateValueAndValidity()
    });
  }
}