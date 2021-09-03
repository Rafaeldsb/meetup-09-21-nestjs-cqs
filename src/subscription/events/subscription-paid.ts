import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Lead } from '../models/lead';

export class SubscriptionPaidEvent {
  constructor(email: string, public readonly transaction: { tid: string }) {}
}

@EventsHandler(SubscriptionPaidEvent)
export class SubscriptionPaidHandler
  implements IEventHandler<SubscriptionPaidEvent>
{
  handle(event: SubscriptionPaidEvent) {
    console.log({ event });
  }
}
