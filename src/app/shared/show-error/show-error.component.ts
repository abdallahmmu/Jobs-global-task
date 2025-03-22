import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-show-error',
  standalone: true,
  templateUrl: './show-error.component.html',
  styleUrl: './show-error.component.css',
  imports:[CommonModule]
})
export class ShowErrorComponent {
  constructor(){}
  @Input({required:true}) ctrl!: AbstractControl | null;

  private ERROR_MESSAGES: any = {
    required: () => 'required',
    minlength: (par: any) => 'Min length is' + ' ' + par.requiredLength ,
    maxlength: (par: any) =>  'Max length is' + ' ' + par.requiredLength,
    pattern: (par: any) => `${this.getPatternErrMsg(par.requiredPattern)} `,
  };

  private PATTERNS: any = {
    "^[^\u0600-\u06FF\p{P}\p{S}]*$": 'Invalid characters', // not allow arabic characters
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%^*_=+-|])(?!.*[<>#&]).{8,64}$":"at least one (uppercase,lowercase,digit,special) character <, >, #, or & not allowed",
  };


  shouldShowErrors(): boolean {
    
    return (
      this.ctrl != null &&
      this.ctrl.errors != null &&
      (this.ctrl.touched || this.ctrl.dirty)
    );
  }

  listOfErrors(): string[] {
    
    if (this.ctrl?.errors != null) {
      return Object.keys(this.ctrl.errors).map((key) =>
        this.ERROR_MESSAGES[key](this.ctrl?.getError(key))
        
      );
    } else return [];
  }

  getPatternErrMsg(pattern: string): string {
    
    return <string>Object.entries(this.PATTERNS).filter(([key, val]) => {
      return key == pattern;
    })[0][1];
  }
}
