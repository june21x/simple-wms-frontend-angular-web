import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChipAutocompleteComponent } from './my-chip-autocomplete.component';

describe('MyChipAutocompleteComponent', () => {
  let component: MyChipAutocompleteComponent;
  let fixture: ComponentFixture<MyChipAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChipAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChipAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
