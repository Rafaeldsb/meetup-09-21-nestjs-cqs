import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Lead } from '../models/lead';

export class LeadCreatedEvent {
  constructor(public readonly lead: Lead) {}
}

@EventsHandler(LeadCreatedEvent)
export class LeadCreatedHandler implements IEventHandler<LeadCreatedEvent> {
  handle(event: LeadCreatedEvent) {
    console.log({ event });
  }
}
