import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateLeadHandler } from './commands/create-lead';
import { CreateSubscriptionHandler } from './commands/create-subscription';
import { PaySubscriptionHandler } from './commands/pay-subscription';
import { LeadCreatedHandler } from './events/lead-created';
import { SubscriptionCreatedHandler } from './events/subscription-created';
import { GetSubscriptionHandler } from './queries/get-subscription';
import { LeadRepository } from './repositories/lead.repository';
import { SubscriptionRepository } from './repositories/subscription.repository';
import { SubscriptionController } from './subscription.controller';

const COMMAND_HANDLERS = [
  CreateLeadHandler,
  PaySubscriptionHandler,
  CreateSubscriptionHandler,
];
const EVENT_HANDLERS = [LeadCreatedHandler, SubscriptionCreatedHandler];
const QUERY_HANDLERS = [GetSubscriptionHandler];

@Module({
  imports: [CqrsModule],
  controllers: [SubscriptionController],
  providers: [
    LeadRepository,
    SubscriptionRepository,
    ...COMMAND_HANDLERS,
    ...EVENT_HANDLERS,
    ...QUERY_HANDLERS,
  ],
})
export class SubscriptionModule {}
