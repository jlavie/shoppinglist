import { TestBed } from '@angular/core/testing';

import { IngredientsShoppingListService } from './ingredients-shopping-list.service';

describe('IngredientsShoppingListService', () => {
  let service: IngredientsShoppingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsShoppingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
