import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { LocalAuthGuard, JwtAuthGuard } from './auth.guard';

describe('LocalAuthGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
  });
});

describe('JwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard(new JwtService(), new Reflector())).toBeDefined();
  });
});
