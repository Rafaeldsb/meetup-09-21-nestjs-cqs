import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Subscription } from '../models/subscription';

export class SubscriptionCreatedEvent {
  constructor(public readonly subscription: Subscription) {}
}

@EventsHandler(SubscriptionCreatedEvent)
export class SubscriptionCreatedHandler
  implements IEventHandler<SubscriptionCreatedEvent>
{
  handle(event: SubscriptionCreatedEvent) {
    console.log({ event });
    // send email
  }
}
