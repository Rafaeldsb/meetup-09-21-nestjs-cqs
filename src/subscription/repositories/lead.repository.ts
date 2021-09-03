import { Injectable } from '@nestjs/common';
import { Lead } from '../models/lead';

@Injectable()
export class LeadRepository {
  public async create(email: string): Promise<Lead> {
    return new Lead('1', email);
  }
}
