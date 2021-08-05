import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahItemComponent } from './tambah-item.component';

describe('TambahItemComponent', () => {
  let component: TambahItemComponent;
  let fixture: ComponentFixture<TambahItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TambahItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
