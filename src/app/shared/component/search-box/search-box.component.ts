import { Component, Input, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer = new Subject<string>()
  private debuncerSubsciption?:Subscription;

  @Input()
  public placeholder:string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebaunce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debuncerSubsciption = this.debouncer
    .pipe(debounceTime(300)
    )
    .subscribe( value =>
      this.onDebaunce.emit(value)
  )}

  ngOnDestroy(): void {
    this.debuncerSubsciption?.unsubscribe;
  }


  emitValue(value: string):void {
    this.onValue.emit( value );
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm)
  }

}
