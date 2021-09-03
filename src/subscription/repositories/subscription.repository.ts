import { Injectable } from '@nestjs/common';
import { Subscription } from '../models/subscription';

@Injectable()
export class SubscriptionRepository {
  private subscriptions: Subscription[] = [
    new Subscription('2', 'aloha@test.com'),
  ];

  public async create(email: string) {
    const subscription = new Subscription('1x', email);
    this.subscriptions.push(subscription);
    return subscription;
  }

  public async findByEmail(email: string) {
    return this.subscriptions.find(
      (subscription) => subscription.email === email,
    );
  }

  public async list() {
    return this.subscriptions;
  }

  public async pay() {
    return { tid: 'tid' };
  }
}
