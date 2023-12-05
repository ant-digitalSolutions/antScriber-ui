import { TestBed } from '@angular/core/testing';

import { SocketGatewayService } from './socket-gateway.service';

describe('SocketGatewayService', () => {
  let service: SocketGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
