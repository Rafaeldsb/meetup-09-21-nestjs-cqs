import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { LeadCreatedEvent } from '../events/lead-created';
import { SubscriptionPaidEvent } from '../events/subscription-paid';
import { GetSubscriptionQuery } from '../queries/get-subscription';
import { LeadRepository } from '../repositories/lead.repository';
import { SubscriptionRepository } from '../repositories/subscription.repository';
import { CreateSubscriptionCommand } from './create-subscription';

export class PaySubscriptionCommand {
  constructor(public readonly email: string) {}
}

@CommandHandler(PaySubscriptionCommand)
export class PaySubscriptionHandler
  implements ICommandHandler<PaySubscriptionCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(command: PaySubscriptionCommand) {
    console.log({ command });
    const { email } = command;

    const hasSubscription = await this.queryBus.execute(
      new GetSubscriptionQuery({ email }),
    );

    if (!!hasSubscription) {
      // do anything
    }

    const transaction = await this.subscriptionRepository.pay();

    this.eventBus.publish(new SubscriptionPaidEvent(email, transaction));

    return this.commandBus.execute(new CreateSubscriptionCommand(email));
  }
}
