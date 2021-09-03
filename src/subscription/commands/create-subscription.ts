import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { SubscriptionCreatedEvent } from '../events/subscription-created';
import { SubscriptionPaidEvent } from '../events/subscription-paid';
import { GetSubscriptionQuery } from '../queries/get-subscription';
import { SubscriptionRepository } from '../repositories/subscription.repository';

export class CreateSubscriptionCommand {
  constructor(public readonly email: string) {}
}

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionHandler
  implements ICommandHandler<CreateSubscriptionCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(command: CreateSubscriptionCommand) {
    console.log({ command });
    const { email } = command;

    const subscription = await this.subscriptionRepository.create(email);

    this.eventBus.publish(new SubscriptionCreatedEvent(subscription));

    return subscription;
  }
}
